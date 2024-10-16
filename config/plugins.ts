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
  // ...
});
