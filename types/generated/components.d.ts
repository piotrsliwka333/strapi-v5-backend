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
    description: '';
  };
  attributes: {
    mainLinks: Schema.Attribute.Component<'elements.main-link', true>;
    button: Schema.Attribute.Component<'elements.link', false>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    icon: 'apps';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    brandLogos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    legalInformation: Schema.Attribute.String;
    mainLinks: Schema.Attribute.Component<'elements.main-link', true>;
    contact: Schema.Attribute.Component<'elements.footer-contact', false>;
    newsletter: Schema.Attribute.Component<'elements.newsletter', false> &
      Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'apps';
  };
  attributes: {
    url: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['FACEBOOK', 'X', 'INSTAGRAM', 'YOUTUBE', 'LINKEDIN']
    >;
  };
}

export interface ElementsNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_elements_newsletters';
  info: {
    displayName: 'Newsletter';
    icon: 'apps';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    inputPlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMainLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_main_links';
  info: {
    displayName: 'Main Link';
    icon: 'apps';
    description: '';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    nestedLinks: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
    icon: 'apps';
  };
  attributes: {
    text: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ElementsFooterContact extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_contacts';
  info: {
    displayName: 'Footer Contact';
    icon: 'apps';
    description: '';
  };
  attributes: {
    link: Schema.Attribute.Component<'elements.link', false>;
    email: Schema.Attribute.Email;
    phoneNumber: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
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
      'layout.footer': LayoutFooter;
      'elements.social-link': ElementsSocialLink;
      'elements.newsletter': ElementsNewsletter;
      'elements.main-link': ElementsMainLink;
      'elements.logo': ElementsLogo;
      'elements.link': ElementsLink;
      'elements.footer-contact': ElementsFooterContact;
    }
  }
}
