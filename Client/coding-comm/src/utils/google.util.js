export const getGoogleOAuthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
    };
    
    const qs = new URLSearchParams(options);
    return `${rootURL}?${qs.toString()}`;
}