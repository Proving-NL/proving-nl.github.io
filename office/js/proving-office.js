$().on('load', async function () {
  const client_id = Aim.config.client_id;
  const aimConfig = {
    client_id: client_id,
    scope: 'openid profile name email admin.write',
  };
  const aimClient = new Aim.UserAgentApplication(aimConfig);
  const aimAccount = JSON.parse(aimClient.storage.getItem('aimAccount'));
  const aimRequest = {
    scopes: aimConfig.scope.split(' '),
  };
  if (!aimAccount) {
    function signIn() {
      aimClient.loginPopup(aimRequest).catch(console.error).then(authResult => {
        aimClient.storage.setItem('aimAccount', authResult.account.username);
        document.location.reload();
      });
    }
    $(document.body).append(
      $('button').text('login').on('click', signIn),
    )
  } else {
    const authProvider = {
      getAccessToken: async () => {
        let account = aimClient.storage.getItem('aimAccount');
        if (!account){
          throw new Error(
            'User account missing from session. Please sign out and sign in again.'
          );
        }
        try {
          // First, attempt to get the token silently
          const silentRequest = {
            scopes: aimRequest.scopes,
            account: aimClient.getAccountByUsername(account)
          };
          const silentResult = await aimClient.acquireTokenSilent(silentRequest);
          return silentResult.accessToken;
        } catch (silentError) {
          // If silent requests fails with InteractionRequiredAuthError,
          // attempt to get the token interactively
          if (silentError instanceof Aim.InteractionRequiredAuthError) {
            const interactiveResult = await aimClient.acquireTokenPopup(aimRequest);
            return interactiveResult.accessToken;
          } else {
            throw silentError;
          }
        }
      }
    };
    let dmsConfig = {
      client_id: client_id,
      servers: [{url: 'https://dms.aliconnect.nl'}],
    };
    const dmsClient = Aim.Client.initWithMiddleware({authProvider}, dmsConfig);
    function signOut() {
      aimClient.logout().catch(console.error).then(e => {
        aimClient.storage.removeItem('aimAccount');
        document.location.reload();
      });
    }
    function createLijst(rows){
      const keys = Object.keys(rows[0]||{});
      $('lijst').text('').append(
        $('thead').append(
          $('tr').append(
            keys.map(key => $('th').text(key))
          ),
        ),
        $('tbody').append(
          rows.map(row => $('tr').append(
            keys.map(key => $('td').text(row[key] || ''))
          ))
        ),
      )
    }
    dmsConfig = await dmsClient.loadConfig();

    const url = new URL(document.location);
    const request_type = {
      klant_pakbonnen(klantId){
        console.log(url.searchParams.get('klantId'));
        dmsClient.api('/lijst')
        .query('request_type', 'klant_pakbonnen')
        .query('klantId', url.searchParams.get('klantId'))
        .get().then(body => {
          const rows = body.values;
          const keys = Object.keys(rows[0]||{});
          $('lijst').text('').append(
            $('thead').append($('tr').append(keys.map(key => $('th').text(key)))),
            $('tbody').append(
              rows.map(row => row.trElem = $('tr').append(
                keys.map(key => $('td').class(key).append(
                  key === 'klantId'
                  ? $('a').text(row[key] || '').href('?klantId='+row[key]).on('click', e => pakbonnen(row[key]))
                  : $('span').text(row[key] || '')
                )),
                $('td').append(
                  $('button').text('betaald').on('click', e => {
                    dmsClient.api('/lijst')
                    .query('request_type', 'pakbon_betaald')
                    .query('pakbonId', row.pakbonId)
                    .get().then(e => row.trElem.remove())
                  })
                ),
                $('td').append(
                  $('button').text('verwerkt').on('click', e => {
                    dmsClient.api('/lijst')
                    .query('request_type', 'pakbon_verwerkt')
                    .query('pakbonId', row.pakbonId)
                    .get().then(e => row.trElem.remove())
                  })
                ),
              ))
            ),
          )
        })
      }
    }
    function openstaand(){
      dmsClient.api('/lijst').query('request_type', 'klanten_openstaand').get().then(body => {
        const rows = body.values;
        const keys = Object.keys(rows[0]||{});
        $('lijst').text('').append(
          $('thead').append($('tr').append(
            keys.map(key => $('th').text(key)),
            $('th').text('Herinnering')
          )),
          $('tbody').append(
            rows.map(row => $('tr').append(
              keys.map(key => $('td').class(key).append(
                key === 'klantId'
                ? $('a').text(row[key] || '').href('?request_type=klant_pakbonnen&klantId='+row[key])
                : $('span').text(row[key] || '')
              )),
              $('td').append(
                $('button').text('herinnering').on('click', e => {
                  dmsClient.api('/lijst')
                  .query('request_type', 'klant_herinnering')
                  .query('klantId', row.klantId)
                  .get().then(e => {
                    console.log(e, row);
                  })
                })
              ),
            ))
          ),
        )
      })
    }
    console.log(dmsConfig);
    $(document.body).append(
      $('nav').class('top').append(
        $('button').text('openstaand').on('click', openstaand),
        $('button').text('logout').on('click', signOut),
      ),
      $('table').id('lijst'),
    )
    if (url.searchParams.has('request_type')) {
      request_type[url.searchParams.get('request_type')]();
    }
  }
});
