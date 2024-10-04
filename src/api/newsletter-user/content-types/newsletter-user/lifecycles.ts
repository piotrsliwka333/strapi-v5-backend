const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;

/// really important !!!!!!!
// cc and bcc fields causing some error
// probably when the email is the same I don't know maybe
// when is the same for fields ,,from'' and ,,cc'' and ,,bcc''

export default {
  async beforeCreate(event) {
    console.log('test !!!');

    const { data } = event.params;
    event.state = 'blockAfterCreate';
    const response = await strapi.documents('api::newsletter-user.newsletter-user').findFirst({
      filters: {
        email: data.email,
      },
    });
    // const response = await strapi.db.query('api::newsletter-user.newsletter-user').findOne({
    //   where: { email: data.email },
    // });
    console.log('beforeCreate - response');
    console.log(response);

    if (response && response.isConfirmed)
      throw new ApplicationError('strapiErrors.newsletter.emailAssignedAndConfirmed', {
        foo: 'bar',
      });
    if (response && response.email && !response.isConfirmed) {
      await strapi.plugins['email'].services.email.send({
        // here it don't have id  yet because it hasn't been created yet. in before
        to: response.email,
        from: 'piotrsliwka333@gmail.com', // e.g. single sender verification in SendGrid
        replyTo: 'piotrsliwka333@gmail.com',
        subject: 'Rohi Global consulting Newsletter',
        text: 'Welcome to Rohi Global consulting Newsletter. Here is your confirmation link', // Replace with a valid field ID
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
                                        src="https://generous-leader-d581ba65b8.media.strapiapp.com/logo_1_1_6acbc018f0.png"
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
                                        Newsletter confirmation
                                      </h1>
                                      <p style="color:#000;font-family:-apple-system,system-ui,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;font-size:14px;line-height:24px">
                                        Hello, here is your confirmation link to sign up for our
                                        newsletter. Click the button bellow in order to start receiving
                                        informations from us.
                                      </p>
                                      <a
                                        target="_blank"
                                        href="${`https://strapi-v5-frontend.vercel.app/newsletter/subscribe?newsletterUserDocumentId=${response.documentId}&confirmationToken=${response.confirmationToken}`}"
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
                                        Confirm your email
                                      </a>
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
      });

      throw new ApplicationError('strapiErrors.newsletter.emailAssignedAndNotConfirmed', {
        foo: 'bar',
      });
    }
    event.state = 'allowAfterCreate';
  },

  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    console.log('after Create - newsletter-user !!!!!');
    const { result, state } = event;
    console.log(result);
    console.log(state);
    if (state === 'blockAfterCreate') return;
    await strapi.plugins['email'].services.email.send({
      to: result.email,
      from: 'piotrsliwka333@gmail.com', // e.g. single sender verification in SendGrid
      replyTo: 'piotrsliwka333@gmail.com',
      subject: 'Rohi Global consulting Newsletter',
      text: 'Welcome to Rohi Global consulting Newsletter. Here is your confirmation link', // Replace with a valid field ID
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
                                      src="https://generous-leader-d581ba65b8.media.strapiapp.com/logo_1_1_6acbc018f0.png"
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
                                      Newsletter confirmation
                                    </h1>
                                    <p style="color:#000;font-family:-apple-system,system-ui,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;font-size:14px;line-height:24px">
                                      Hello, here is your confirmation link to sign up for our
                                      newsletter. Click the button bellow in order to start receiving
                                      informations from us.
                                    </p>
                                    <a
                                      target="_blank"
                                      href="${`https://strapi-v5-frontend.vercel.app/newsletter/subscribe?newsletterUserDocumentId=${result.documentId}&confirmationToken=${result.confirmationToken}`}"
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
                                      Confirm your email
                                    </a>
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
    });
  },
};
