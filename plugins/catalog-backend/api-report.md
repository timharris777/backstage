## API Report File for "@backstage/plugin-catalog-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="node" />

import { BackendRegistrable } from '@backstage/backend-plugin-api';
import { CatalogApi } from '@backstage/catalog-client';
import { CatalogEntityDocument } from '@backstage/plugin-catalog-common';
import { CatalogProcessor } from '@backstage/plugin-catalog-node';
import { CatalogProcessorCache } from '@backstage/plugin-catalog-node';
import { CatalogProcessorEmit } from '@backstage/plugin-catalog-node';
import { CatalogProcessorEntityResult } from '@backstage/plugin-catalog-node';
import { CatalogProcessorErrorResult } from '@backstage/plugin-catalog-node';
import { CatalogProcessorLocationResult } from '@backstage/plugin-catalog-node';
import { CatalogProcessorParser } from '@backstage/plugin-catalog-node';
import { CatalogProcessorRefreshKeysResult } from '@backstage/plugin-catalog-node';
import { CatalogProcessorRelationResult } from '@backstage/plugin-catalog-node';
import { CatalogProcessorResult } from '@backstage/plugin-catalog-node';
import { ConditionalPolicyDecision } from '@backstage/plugin-permission-common';
import { Conditions } from '@backstage/plugin-permission-node';
import { Config } from '@backstage/config';
import { DeferredEntity } from '@backstage/plugin-catalog-node';
import { DocumentCollatorFactory } from '@backstage/plugin-search-common';
import { Entity } from '@backstage/catalog-model';
import { EntityPolicy } from '@backstage/catalog-model';
import { EntityProvider } from '@backstage/plugin-catalog-node';
import { EntityProviderConnection } from '@backstage/plugin-catalog-node';
import { EntityProviderMutation } from '@backstage/plugin-catalog-node';
import { EntityRelationSpec } from '@backstage/plugin-catalog-node';
import { GetEntitiesRequest } from '@backstage/catalog-client';
import { JsonValue } from '@backstage/types';
import { LocationEntityV1alpha1 } from '@backstage/catalog-model';
import { LocationSpec } from '@backstage/plugin-catalog-node';
import { Logger } from 'winston';
import { Permission } from '@backstage/plugin-permission-common';
import { PermissionAuthorizer } from '@backstage/plugin-permission-common';
import { PermissionCondition } from '@backstage/plugin-permission-common';
import { PermissionCriteria } from '@backstage/plugin-permission-common';
import { PermissionEvaluator } from '@backstage/plugin-permission-common';
import { PermissionRule } from '@backstage/plugin-permission-node';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { PluginEndpointDiscovery } from '@backstage/backend-common';
import { processingResult } from '@backstage/plugin-catalog-node';
import { Readable } from 'stream';
import { ResourcePermission } from '@backstage/plugin-permission-common';
import { Router } from 'express';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { TokenManager } from '@backstage/backend-common';
import { UrlReader } from '@backstage/backend-common';
import { Validators } from '@backstage/catalog-model';

// @public (undocumented)
export type AnalyzeLocationEntityField = {
  field: string;
  state:
    | 'analysisSuggestedValue'
    | 'analysisSuggestedNoValue'
    | 'needsUserInput';
  value: string | null;
  description: string;
};

// @public
export type AnalyzeLocationExistingEntity = {
  location: LocationSpec;
  isRegistered: boolean;
  entity: Entity;
};

// @public
export type AnalyzeLocationGenerateEntity = {
  entity: RecursivePartial<Entity>;
  fields: AnalyzeLocationEntityField[];
};

// @public (undocumented)
export type AnalyzeLocationRequest = {
  location: LocationSpec;
};

// @public (undocumented)
export type AnalyzeLocationResponse = {
  existingEntityFiles: AnalyzeLocationExistingEntity[];
  generateEntities: AnalyzeLocationGenerateEntity[];
};

// @public (undocumented)
export class AnnotateLocationEntityProcessor implements CatalogProcessor {
  constructor(options: { integrations: ScmIntegrationRegistry });
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  preProcessEntity(
    entity: Entity,
    location: LocationSpec,
    _: CatalogProcessorEmit,
    originLocation: LocationSpec,
  ): Promise<Entity>;
}

// @public (undocumented)
export class AnnotateScmSlugEntityProcessor implements CatalogProcessor {
  constructor(opts: { scmIntegrationRegistry: ScmIntegrationRegistry });
  // (undocumented)
  static fromConfig(config: Config): AnnotateScmSlugEntityProcessor;
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  preProcessEntity(entity: Entity, location: LocationSpec): Promise<Entity>;
}

// @public (undocumented)
export class BuiltinKindsEntityProcessor implements CatalogProcessor {
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  postProcessEntity(
    entity: Entity,
    _location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity>;
  // (undocumented)
  validateEntityKind(entity: Entity): Promise<boolean>;
}

// @public
export class CatalogBuilder {
  addEntityPolicy(
    ...policies: Array<EntityPolicy | Array<EntityPolicy>>
  ): CatalogBuilder;
  addEntityProvider(
    ...providers: Array<EntityProvider | Array<EntityProvider>>
  ): CatalogBuilder;
  // @alpha
  addPermissionRules(
    ...permissionRules: Array<
      CatalogPermissionRule | Array<CatalogPermissionRule>
    >
  ): void;
  addProcessor(
    ...processors: Array<CatalogProcessor | Array<CatalogProcessor>>
  ): CatalogBuilder;
  build(): Promise<{
    processingEngine: CatalogProcessingEngine;
    router: Router;
  }>;
  static create(env: CatalogEnvironment): CatalogBuilder;
  getDefaultProcessors(): CatalogProcessor[];
  replaceEntityPolicies(policies: EntityPolicy[]): CatalogBuilder;
  replaceProcessors(processors: CatalogProcessor[]): CatalogBuilder;
  setEntityDataParser(parser: CatalogProcessorParser): CatalogBuilder;
  setFieldFormatValidators(validators: Partial<Validators>): CatalogBuilder;
  setLocationAnalyzer(locationAnalyzer: LocationAnalyzer): CatalogBuilder;
  setPlaceholderResolver(
    key: string,
    resolver: PlaceholderResolver,
  ): CatalogBuilder;
  setProcessingInterval(
    processingInterval: ProcessingIntervalFunction,
  ): CatalogBuilder;
  setProcessingIntervalSeconds(seconds: number): CatalogBuilder;
  // (undocumented)
  subscribe(options: {
    onProcessingError: (event: {
      unprocessedEntity: Entity;
      errors: Error[];
    }) => Promise<void> | void;
  }): void;
}

// @alpha
export const catalogConditions: Conditions<{
  hasAnnotation: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [annotation: string]
  >;
  hasLabel: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [label: string]
  >;
  hasMetadata: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [key: string, value?: string | undefined]
  >;
  hasSpec: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [key: string, value?: string | undefined]
  >;
  isEntityKind: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [kinds: string[]]
  >;
  isEntityOwner: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [claims: string[]]
  >;
}>;

// @public (undocumented)
export type CatalogEnvironment = {
  logger: Logger;
  database: PluginDatabaseManager;
  config: Config;
  reader: UrlReader;
  permissions: PermissionEvaluator | PermissionAuthorizer;
};

// @alpha
export type CatalogPermissionRule<TParams extends unknown[] = unknown[]> =
  PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>;

// @alpha
export const catalogPlugin: (options?: unknown) => BackendRegistrable;

// @public (undocumented)
export interface CatalogProcessingEngine {
  // (undocumented)
  start(): Promise<void>;
  // (undocumented)
  stop(): Promise<void>;
}

export { CatalogProcessor };

export { CatalogProcessorCache };

export { CatalogProcessorEmit };

export { CatalogProcessorEntityResult };

export { CatalogProcessorErrorResult };

export { CatalogProcessorLocationResult };

export { CatalogProcessorParser };

export { CatalogProcessorRefreshKeysResult };

export { CatalogProcessorRelationResult };

export { CatalogProcessorResult };

// @public (undocumented)
export class CodeOwnersProcessor implements CatalogProcessor {
  constructor(options: {
    integrations: ScmIntegrationRegistry;
    logger: Logger;
    reader: UrlReader;
  });
  // (undocumented)
  static fromConfig(
    config: Config,
    options: {
      logger: Logger;
      reader: UrlReader;
    },
  ): CodeOwnersProcessor;
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  preProcessEntity(entity: Entity, location: LocationSpec): Promise<Entity>;
}

// @alpha
export const createCatalogConditionalDecision: (
  permission: ResourcePermission<'catalog-entity'>,
  conditions: PermissionCriteria<
    PermissionCondition<'catalog-entity', unknown[]>
  >,
) => ConditionalPolicyDecision;

// @alpha
export const createCatalogPermissionRule: <TParams extends unknown[]>(
  rule: PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>,
) => PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>;

// @public
export function createRandomProcessingInterval(options: {
  minSeconds: number;
  maxSeconds: number;
}): ProcessingIntervalFunction;

// @public @deprecated (undocumented)
export class DefaultCatalogCollator {
  constructor(options: {
    discovery: PluginEndpointDiscovery;
    tokenManager: TokenManager;
    locationTemplate?: string;
    filter?: GetEntitiesRequest['filter'];
    catalogClient?: CatalogApi;
  });
  // (undocumented)
  protected applyArgsToFormat(
    format: string,
    args: Record<string, string>,
  ): string;
  // (undocumented)
  protected readonly catalogClient: CatalogApi;
  // (undocumented)
  protected discovery: PluginEndpointDiscovery;
  // (undocumented)
  execute(): Promise<CatalogEntityDocument[]>;
  // (undocumented)
  protected filter?: GetEntitiesRequest['filter'];
  // (undocumented)
  static fromConfig(
    _config: Config,
    options: {
      discovery: PluginEndpointDiscovery;
      tokenManager: TokenManager;
      filter?: GetEntitiesRequest['filter'];
    },
  ): DefaultCatalogCollator;
  // (undocumented)
  protected locationTemplate: string;
  // (undocumented)
  protected tokenManager: TokenManager;
  // (undocumented)
  readonly type: string;
  // (undocumented)
  readonly visibilityPermission: Permission;
}

// @public (undocumented)
export class DefaultCatalogCollatorFactory implements DocumentCollatorFactory {
  // (undocumented)
  static fromConfig(
    _config: Config,
    options: DefaultCatalogCollatorFactoryOptions,
  ): DefaultCatalogCollatorFactory;
  // (undocumented)
  getCollator(): Promise<Readable>;
  // (undocumented)
  readonly type: string;
  // (undocumented)
  readonly visibilityPermission: Permission;
}

// @public (undocumented)
export type DefaultCatalogCollatorFactoryOptions = {
  discovery: PluginEndpointDiscovery;
  tokenManager: TokenManager;
  locationTemplate?: string;
  filter?: GetEntitiesRequest['filter'];
  batchSize?: number;
  catalogClient?: CatalogApi;
};

export { DeferredEntity };

// @public
export type EntitiesSearchFilter = {
  key: string;
  values?: string[];
};

// @public
export type EntityFilter =
  | {
      allOf: EntityFilter[];
    }
  | {
      anyOf: EntityFilter[];
    }
  | {
      not: EntityFilter;
    }
  | EntitiesSearchFilter;

export { EntityProvider };

export { EntityProviderConnection };

export { EntityProviderMutation };

export { EntityRelationSpec };

// @public (undocumented)
export class FileReaderProcessor implements CatalogProcessor {
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  readLocation(
    location: LocationSpec,
    optional: boolean,
    emit: CatalogProcessorEmit,
    parser: CatalogProcessorParser,
  ): Promise<boolean>;
}

// @public (undocumented)
export type LocationAnalyzer = {
  analyzeLocation(
    location: AnalyzeLocationRequest,
  ): Promise<AnalyzeLocationResponse>;
};

// @public (undocumented)
export class LocationEntityProcessor implements CatalogProcessor {
  constructor(options: LocationEntityProcessorOptions);
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  postProcessEntity(
    entity: Entity,
    location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity>;
}

// @public (undocumented)
export type LocationEntityProcessorOptions = {
  integrations: ScmIntegrationRegistry;
};

export { LocationSpec };

// @public (undocumented)
export function locationSpecToLocationEntity(opts: {
  location: LocationSpec;
  parentEntity?: Entity;
}): LocationEntityV1alpha1;

// @public (undocumented)
export function parseEntityYaml(
  data: Buffer,
  location: LocationSpec,
): Iterable<CatalogProcessorResult>;

// @alpha
export const permissionRules: {
  hasAnnotation: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [annotation: string]
  >;
  hasLabel: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [label: string]
  >;
  hasMetadata: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [key: string, value?: string | undefined]
  >;
  hasSpec: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [key: string, value?: string | undefined]
  >;
  isEntityKind: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [kinds: string[]]
  >;
  isEntityOwner: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    [claims: string[]]
  >;
};

// @public
export class PlaceholderProcessor implements CatalogProcessor {
  constructor(options: PlaceholderProcessorOptions);
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  preProcessEntity(
    entity: Entity,
    location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity>;
}

// @public (undocumented)
export type PlaceholderProcessorOptions = {
  resolvers: Record<string, PlaceholderResolver>;
  reader: UrlReader;
  integrations: ScmIntegrationRegistry;
};

// @public (undocumented)
export type PlaceholderResolver = (
  params: PlaceholderResolverParams,
) => Promise<JsonValue>;

// @public (undocumented)
export type PlaceholderResolverParams = {
  key: string;
  value: JsonValue;
  baseUrl: string;
  read: PlaceholderResolverRead;
  resolveUrl: PlaceholderResolverResolveUrl;
  emit: CatalogProcessorEmit;
};

// @public (undocumented)
export type PlaceholderResolverRead = (url: string) => Promise<Buffer>;

// @public (undocumented)
export type PlaceholderResolverResolveUrl = (
  url: string,
  base: string,
) => string;

// @public
export type ProcessingIntervalFunction = () => number;

export { processingResult };

// @public (undocumented)
export class UrlReaderProcessor implements CatalogProcessor {
  constructor(options: { reader: UrlReader; logger: Logger });
  // (undocumented)
  getProcessorName(): string;
  // (undocumented)
  readLocation(
    location: LocationSpec,
    optional: boolean,
    emit: CatalogProcessorEmit,
    parser: CatalogProcessorParser,
    cache: CatalogProcessorCache,
  ): Promise<boolean>;
}
```
