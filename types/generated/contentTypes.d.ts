import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    articleTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    articleIntro: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 288;
      }>;
    articleBody: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    mainArticleImage: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    articleCategory: Attribute.Relation<
      'api::article.article',
      'manyToMany',
      'api::article-category.article-category'
    >;
    isFeatured: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::article.article',
      'oneToMany',
      'api::article.article'
    >;
    locale: Attribute.String;
  };
}

export interface ApiArticleCategoryArticleCategory
  extends Schema.CollectionType {
  collectionName: 'article_categories';
  info: {
    singularName: 'article-category';
    pluralName: 'article-categories';
    displayName: 'Article Category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    articleCategoryName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    articles: Attribute.Relation<
      'api::article-category.article-category',
      'manyToMany',
      'api::article.article'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article-category.article-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article-category.article-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::article-category.article-category',
      'oneToMany',
      'api::article-category.article-category'
    >;
    locale: Attribute.String;
  };
}

export interface ApiAwardAward extends Schema.CollectionType {
  collectionName: 'awards';
  info: {
    singularName: 'award';
    pluralName: 'awards';
    displayName: 'Award';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    awardImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    awardDate: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'2024'>;
    awardDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::award.award',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::award.award',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::award.award',
      'oneToMany',
      'api::award.award'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCareerCareer extends Schema.CollectionType {
  collectionName: 'careers';
  info: {
    singularName: 'career';
    pluralName: 'careers';
    displayName: 'Career';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    jobTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isOpen: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    jobLocations: Attribute.Relation<
      'api::career.career',
      'manyToMany',
      'api::job-location.job-location'
    >;
    jobDescription: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career.career',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::career.career',
      'oneToMany',
      'api::career.career'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCarouselCarousel extends Schema.CollectionType {
  collectionName: 'carousels';
  info: {
    singularName: 'carousel';
    pluralName: 'carousels';
    displayName: 'Carousel';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    images: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::carousel.carousel',
      'oneToMany',
      'api::carousel.carousel'
    >;
    locale: Attribute.String;
  };
}

export interface ApiDownloadDownload extends Schema.CollectionType {
  collectionName: 'downloads';
  info: {
    singularName: 'download';
    pluralName: 'downloads';
    displayName: 'Download';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    mediaFile: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    mediaFileDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::download.download',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::download.download',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::download.download',
      'oneToMany',
      'api::download.download'
    >;
    locale: Attribute.String;
  };
}

export interface ApiJobLocationJobLocation extends Schema.CollectionType {
  collectionName: 'job_locations';
  info: {
    singularName: 'job-location';
    pluralName: 'job-locations';
    displayName: 'Job Location';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    jobLocation: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    careers: Attribute.Relation<
      'api::job-location.job-location',
      'manyToMany',
      'api::career.career'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::job-location.job-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::job-location.job-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::job-location.job-location',
      'oneToMany',
      'api::job-location.job-location'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPhotoGalleryPhotoGallery extends Schema.CollectionType {
  collectionName: 'photo_galleries';
  info: {
    singularName: 'photo-gallery';
    pluralName: 'photo-galleries';
    displayName: 'Photo Gallery';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    photo: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    photoTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    photoDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::photo-gallery.photo-gallery',
      'oneToMany',
      'api::photo-gallery.photo-gallery'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Schema.CollectionType {
  collectionName: 'privacy_policies';
  info: {
    singularName: 'privacy-policy';
    pluralName: 'privacy-policies';
    displayName: 'Privacy Policy';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    privacyPolicyDescription: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::privacy-policy.privacy-policy',
      'oneToMany',
      'api::privacy-policy.privacy-policy'
    >;
    locale: Attribute.String;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    projectName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<'Project Name'>;
    projectRating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    projectSummary: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 288;
      }> &
      Attribute.DefaultTo<'Project Summary'>;
    projectMainBanner: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    eighthAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      > &
      Attribute.DefaultTo<'0'>;
    quarterAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      > &
      Attribute.DefaultTo<'0'>;
    halfAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      > &
      Attribute.DefaultTo<'0'>;
    acrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: '0';
        },
        string
      > &
      Attribute.DefaultTo<'0'>;
    isFeatured: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    subProjects: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::sub-project.sub-project'
    >;
    projectLocation: Attribute.Relation<
      'api::project.project',
      'manyToOne',
      'api::project-location.project-location'
    >;
    valueAdditions: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::value-addition.value-addition'
    >;
    projectUpdate: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::project-update.project-update'
    >;
    isActive: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<true>;
    projectContent: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::project.project'
    >;
    locale: Attribute.String;
  };
}

export interface ApiProjectLocationProjectLocation
  extends Schema.CollectionType {
  collectionName: 'project_locations';
  info: {
    singularName: 'project-location';
    pluralName: 'project-locations';
    displayName: 'Project Location';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    projectLocation: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projects: Attribute.Relation<
      'api::project-location.project-location',
      'oneToMany',
      'api::project.project'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-location.project-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-location.project-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::project-location.project-location',
      'oneToMany',
      'api::project-location.project-location'
    >;
    locale: Attribute.String;
  };
}

export interface ApiProjectUpdateProjectUpdate extends Schema.CollectionType {
  collectionName: 'project_updates';
  info: {
    singularName: 'project-update';
    pluralName: 'project-updates';
    displayName: 'Project Update';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    projectUpdateTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projectUpdateBody: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projectUpdateIntro: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 288;
      }>;
    projectUpdateMainImage: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isFeatured: Attribute.Boolean &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    project: Attribute.Relation<
      'api::project-update.project-update',
      'oneToOne',
      'api::project.project'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-update.project-update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-update.project-update',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::project-update.project-update',
      'oneToMany',
      'api::project-update.project-update'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSubProjectSubProject extends Schema.CollectionType {
  collectionName: 'sub_projects';
  info: {
    singularName: 'sub-project';
    pluralName: 'sub-projects';
    displayName: 'Sub Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    subProjectName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    eighthAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    quarterAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    halfAcrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    acrePrice: Attribute.BigInteger &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    project: Attribute.Relation<
      'api::sub-project.sub-project',
      'manyToOne',
      'api::project.project'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-project.sub-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-project.sub-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::sub-project.sub-project',
      'oneToMany',
      'api::sub-project.sub-project'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    teamMember: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    teamMemberRole: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    teamMemberDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    teamMemberImage: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::team.team',
      'oneToMany',
      'api::team.team'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    clientName: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 40;
      }> &
      Attribute.DefaultTo<'Client Name'>;
    clientTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 40;
      }> &
      Attribute.DefaultTo<'Client Title'>;
    clientComment: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 288;
      }> &
      Attribute.DefaultTo<'Lorem ipsum dolor'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    locale: Attribute.String;
  };
}

export interface ApiValueAdditionValueAddition extends Schema.CollectionType {
  collectionName: 'value_additions';
  info: {
    singularName: 'value-addition';
    pluralName: 'value-additions';
    displayName: 'Value Addition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    valueAdditionTitle: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projects: Attribute.Relation<
      'api::value-addition.value-addition',
      'manyToMany',
      'api::project.project'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::value-addition.value-addition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::value-addition.value-addition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::value-addition.value-addition',
      'oneToMany',
      'api::value-addition.value-addition'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article.article': ApiArticleArticle;
      'api::article-category.article-category': ApiArticleCategoryArticleCategory;
      'api::award.award': ApiAwardAward;
      'api::career.career': ApiCareerCareer;
      'api::carousel.carousel': ApiCarouselCarousel;
      'api::download.download': ApiDownloadDownload;
      'api::job-location.job-location': ApiJobLocationJobLocation;
      'api::photo-gallery.photo-gallery': ApiPhotoGalleryPhotoGallery;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::project.project': ApiProjectProject;
      'api::project-location.project-location': ApiProjectLocationProjectLocation;
      'api::project-update.project-update': ApiProjectUpdateProjectUpdate;
      'api::sub-project.sub-project': ApiSubProjectSubProject;
      'api::team.team': ApiTeamTeam;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::value-addition.value-addition': ApiValueAdditionValueAddition;
    }
  }
}
