export default {
    oidc: {
        issuer: 'https://dev-97209546.okta.com/oauth2/default',
        clientId: '0oaa1jky48bPb45Tt5d7',
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile', 'email'],
        useInteractionCodeFlow: false,
        useClassicEngine: true
    }
}
