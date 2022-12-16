import { TagName } from 'shared/src';
import {
  AggregatedData,
  AggregatedTagNamesForVersionsAndPrefixes,
  ConsumedTagNamesForVersionsAndPrefixes,
  TagNameData,
  TagNamesAggregated,
  TagNamesWithPropertyNames,
} from './types';
import { getUnusedTagNames, incrementTagName } from './count-data-helper';
import { componentMeta } from '@porsche-design-system/shared';

export const getPdsTagNamesWithPropertyNames = (): TagNamesWithPropertyNames =>
  Object.entries(componentMeta).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.props ? Object.keys(value.props) : [],
    }),
    {} as TagNamesWithPropertyNames
  );

export const getConsumedPrefixesForVersions = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): { [pdsVersion: string]: string[] } => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.keys(prefixesWithData),
    }),
    {}
  );
};

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameData[]): TagNamesAggregated =>
  tagNamesWithProperties.reduce((result, tagNameData) => {
    const tagName = Object.keys(tagNameData)[0] as TagName;
    result[tagName] = incrementTagName(result[tagName], tagNameData);
    return result;
  }, {} as TagNamesAggregated);

export const getAggregatedConsumedTagNamesForVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): AggregatedTagNamesForVersionsAndPrefixes => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.entries(prefixesWithData).reduce(
        (result, [prefix, tagNamesWithProperties]) => ({
          ...result,
          [prefix]: getAggregatedConsumedTagNames(tagNamesWithProperties),
        }),
        {}
      ),
    }),
    {}
  );
};

export const getAggregatedConsumedTagNames = (rawDataWithoutVersionsAndPrefixes: TagNameData[]): AggregatedData => {
  const tagNamesWithPropertiesAggregated = getAggregatedTagNamesWithProperties(rawDataWithoutVersionsAndPrefixes);
  const unusedTagNames = getUnusedTagNames(tagNamesWithPropertiesAggregated);
  return {
    tagNames: tagNamesWithPropertiesAggregated,
    unusedTagNames,
  };
};

export const getRawDataWithoutVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): TagNameData[] => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) =>
      result.concat(
        Object.entries(prefixesWithData).reduce(
          (result, [prefix, tagNamesWithProperties]) => result.concat(tagNamesWithProperties),
          [] as TagNameData[]
        )
      ),
    [] as TagNameData[]
  );
};
