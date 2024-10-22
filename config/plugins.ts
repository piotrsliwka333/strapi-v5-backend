export default ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'aws-s3', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            ACL: env('AWS_ACL'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES'),
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
    },
    actionOptions: {
      upload: {},
      uploadStream: {},
      delete: {},
    },
  },
  // email - amazon ses configuration
  // email: {
  //   config: {
  //     provider: 'amazon-ses',
  //     providerOptions: {
  //       key: env('AWS_SES_KEY'),
  //       secret: env('AWS_SES_SECRET'),
  //       amazon: 'https://email.eu-north-1.amazonaws.com',
  //     },
  //     settings: {
  //       defaultFrom: 'no-reply@test1020.xyz',
  //       defaultReplyTo: 'admin@test1020.xyz',
  //     },
  //   },
  // },
  // email: {
  //   config: {
  //     provider: 'sendgrid',
  //     providerOptions: {
  //       apiKey: env('SENDGRID_API_KEY'),
  //     },
  //     settings: {
  //       defaultFrom: 'piotrsliwka333@gmail',
  //       defaultReplyTo: 'piotrsliwka333@gmail',
  //     },
  //   },
  // },
  // ...
});
