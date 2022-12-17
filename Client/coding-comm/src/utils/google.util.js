export const getGoogleOAuthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: 'http://localhost:8080/sessions/oauth/google',
        client_id: '697070237521-f0uoshu5v3kfffk93pdjch5kd746eei0.apps.googleusercontent.com',
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
    };
    
    const qs = new URLSearchParams(options);
    console.log("QS: ", qs);
    return `${rootURL}?${qs.toString()}`;
}