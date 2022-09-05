import { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../components/Form/Input';
import Tree from '../components/Tree';
import { InputProps } from '../components/Form/Input/interface';
import { TreeProps, TreeDataProps } from '../components/Tree/interface';

const defaultProps = {
  error: undefined,
};

type HomePageProps = {
  error: any;
  props: any;
} & typeof defaultProps;

const Home: NextPage<HomePageProps> = ({ error, ...props }: HomePageProps) => {
  const methods = useForm();
  const { handleSubmit, getValues, clearErrors, formState } = methods;
  const { errors: formError }: any = formState;
  const [treemapState, setTreemapState] = useState<Array<TreeProps>>([]);
  const errorLength = Object?.keys(formError)?.length;
  useEffect(() => {
    if (formError && Object?.keys(formError)?.length > 0) {
      setTreemapState([]);
    }
  }, [formError, errorLength]);
  const inputDataArray: Array<InputProps> = [
    {
      name: 'data',
      labelText: 'Data:',
      type: 'textarea',
      errorMessage: 'Json data format error.',
      rules: {
        validate: (value: any) => {
          try {
            switch (false) {
              case value.match('/{.*:{.*:.*}}/g'):
                return false;
              case Array.isArray(JSON?.parse(value)) &&
                JSON.parse(value)?.length <= 50:
                return false;
              case JSON?.parse(value)?.filter(
                (v: any) => typeof v?.name !== 'string'
              )?.length === 0:
                return false;
              case JSON?.parse(value)?.filter(
                (v: any) =>
                  typeof v?.weight !== 'number' || Number.isNaN(v?.weight)
              )?.length === 0:
                return false;
              default:
                return true;
            }
          } catch (e) {
            return false;
          }
        },
      },
    },
    {
      name: 'rowNumber',
      labelText: 'Row Number:',
      type: 'number',
      errorMessage:
        'row number must be number and could not larger than array length.',
      rules: {
        validate: (value: any) => {
          try {
            switch (false) {
              case typeof value !== 'number' || Number.isNaN(value):
                return false;
              case value <= JSON?.parse(getValues('data'))?.length:
                return false;
              default:
                return true;
            }
          } catch (e) {
            return false;
          }
        },
      },
    },
  ];
  const onSubmit = (formData: any): void => {
    clearErrors();
    const formattedData: {
      treeArray: Array<TreeDataProps>;
      rowNumber: number;
    } = {
      treeArray: JSON.parse(formData?.data)?.map((v: any) => {
        return {
          treeWeight: v?.weight,
          ...v,
        };
      }),
      rowNumber: +formData?.rowNumber,
    };
    const filteredArray = formattedData?.treeArray?.filter(
      (v: TreeDataProps, i: number) => i < formattedData?.rowNumber
    );
    const maxWeightArray = filteredArray?.map(
      (v: TreeDataProps) => v?.treeWeight
    );
    const maxWeight = Math.max(...maxWeightArray);
    const targetedArray: Array<TreeProps> = filteredArray?.map(
      (v: TreeDataProps) => {
        return {
          ...v,
          maxWeight,
        };
      }
    );
    setTreemapState(targetedArray);
  };
  return (
    <div>
      <Head>
        <title>simple-treemap</title>
        <meta name="description" content="simple-treemap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="formContainer">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputDataArray?.map((v: InputProps, i: number) => (
              <Input
                name={v?.name}
                type={v?.type}
                labelText={v?.labelText}
                rules={v?.rules}
                errorMessage={v?.errorMessage}
                key={`Input: ${i}`}
              />
            ))}
            <input type="submit" />
            <input type="reset" />
          </form>
        </FormProvider>
        {treemapState?.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              margin: '20px',
            }}
          >
            {treemapState?.map((v: TreeProps, i: number) => (
              <Tree
                name={v?.name}
                value={v?.value}
                treeWeight={v?.treeWeight}
                maxWeight={v?.maxWeight}
                key={`treemapState_${i}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const { resolvedUrl } = context;
    const reqError = context?.query?.error;
    return {
      props: {
        resolvedUrl,
        error: reqError || null,
      },
    };
  } catch (e) {
    console.error(`Home: getServerSideProps: ${e}`);
    return {
      props: {
        error: e,
      },
    };
  }
};

export default Home;

Home.propTypes = {
  error: PropTypes.oneOfType<any>([PropTypes.any]),
};

Home.defaultProps = defaultProps;
