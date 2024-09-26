import type { Struct, Schema } from '@strapi/strapi';

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    icon: 'apps';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mainLinks: Schema.Attribute.Component<'elements.main-link', true>;
  };
}

export interface ElementsMainLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_main_links';
  info: {
    displayName: 'Main Link';
    icon: 'apps';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    nestedLinks: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
    description: '';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    deepNestedLinks: Schema.Attribute.Component<'elements.deep-link', true>;
  };
}

export interface ElementsDeepLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_deep_links';
  info: {
    displayName: 'Deep Link';
    icon: 'apps';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'layout.header': LayoutHeader;
      'elements.main-link': ElementsMainLink;
      'elements.link': ElementsLink;
      'elements.deep-link': ElementsDeepLink;
    }
  }
}
