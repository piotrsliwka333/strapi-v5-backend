function getStrapiURL(path = '') {
  return `${'https://generous-leader-d581ba65b8.strapiapp.com'}${path}`;
}

function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

const sendNewsletter = async (
  userEmail,
  newsletterUserDocumentId,
  unsubscribeToken,
  title,
  description,
  coverUrl,
  slug
) => {
  console.log('sendNewsletter');
  const emailTemplate = {
    subject: 'Welcome <%= user.email %>',
    text: `Welcome to Rohi Global consulting
      New Articlee has been added`,
    html: `
    <table width="100%" style="width: 100% !important" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td align="center">
            <table
              width="600px"
              border="0"
              cellspacing="0"
              cellpadding="40"
              style="border: 1px solid #eaeaea; border-radius: 5px; margin: 40px"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <div
                      style="
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                          'Helvetica Neue', sans-serif;
                        text-align: left;
                        width: 465px;
                      "
                    >
                      <table
                        style="width: 100% !important; margin: 0 0 40px 0"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tbody>
                          <tr>
                            <td align="center">
                              <div>
                                <img
                                  style="margin: 0 0 30px 0"
                                  src="https://generous-leader-d581ba65b8.strapiapp.com/logo_1_f352c1dc2b.png"
                                />
                                <h1
                                  style="
                                    color: #000;
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                                      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                    font-size: 24px;
                                    font-weight: normal;
                                    margin: 0 0 30px 0;
                                    padding: 0;
                                  "
                                >
                                  New article has been added
                                </h1>
                                <img src="${coverUrl}" style="width: 100%; margin: 0 0 30px 0 0; border-radius: 5px;"/>
                                <h2
                                  style="
                                    color: #000;
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                                      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                    font-size: 20px;
                                    font-weight: normal;
                                    margin: 0 0 30px 0;
                                    padding: 0;
                                  "
                                >
                                  ${title}
                                </h2>
                                <p style="color:#000;font-family:-apple-system,system-ui,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;font-size:14px;line-height:24px">
                                  ${description}
                                </p>
                                <a
                                  target="_blank"
                                  href="https://strapi-v5-frontend.vercel.app/blog/all/<%= slug %>"
                                  style="
                                    background-color: #000;
                                    border-radius: 5px;
                                    color: #fff;
                                    display: inline-block;
                                    font-family: -apple-system, system-ui, BlinkMacSystemFont,
                                      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                                      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                                    font-size: 12px;
                                    font-weight: 500;
                                    line-height: 50px;
                                    text-align: center;
                                    text-decoration: none;
                                    width: 200px;
                                  "
                                >
                                  Read more
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr
                        style="
                          border: none;
                          border-top: 1px solid #eaeaea;
                          margin: 26px 0;
                          width: 100%;
                        "
                      />
                      <table
                        style="width: 100% !important; margin: 0 0 40px 0"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tbody>
                          <tr>
                            <td align="center">
                              <div>
                                <p
                                  style="
                                    color: #666666;
                                    font-family: -apple-system, system-ui, BlinkMacSystemFont,
                                      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                                      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                                    font-size: 12px;
                                    line-height: 24px;
                                  "
                                >
                                  Click unsubscribe button below if you don't wanna longer receive
                                  infroamtion from us
                                </p>
                                <a 
                                target="_blank"
                                href="${`https://strapi-v5-frontend.vercel.app/newsletter/unsubscribe?newsletterUserDocumentId=<%= newsletterUserDocumentId %>&unsubscribeToken=<%= unsubscribeToken %>`}"
                                style="color: #067df7; text-decoration: none"
                                  >
                                  Unsubscribe
                                </a
                                >
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  };

  await strapi.plugins['email'].services.email.sendTemplatedEmail(
    {
      to: userEmail,
      from: 'piotrsliwka333@gmail.com',
      replyTo: 'piotrsliwka333@gmail.com',
      // from: is not specified, the defaultFrom is used.
    },
    emailTemplate,
    {
      user: {
        email: userEmail,
      },
      newsletterUserDocumentId: newsletterUserDocumentId,
      unsubscribeToken: unsubscribeToken,
      slug: slug,
    }
  );
};

export default {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;
    if (result.locale !== 'en') return;

    try {
      const newsletterUser = await strapi.entityService.findMany(
        'api::newsletter-user.newsletter-user',
        { filters: { isConfirmed: true } }
      );

      const tempArr = [];

      newsletterUser.forEach((newsletterUser) => {
        tempArr.push(
          sendNewsletter(
            newsletterUser.email,
            newsletterUser.documentId,
            newsletterUser.unsubscribeToken,
            result.title,
            result.description,
            getStrapiMedia(result.cover.url),
            result.slug
          )
        );
      });

      await Promise.all(tempArr);
    } catch (err) {
      console.log(err);
    }
  },
};
