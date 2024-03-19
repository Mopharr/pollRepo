export const reachGoogle = () => {
  const clientID =
    "84982182930-8umgd6jpeqa4i1aihondemid95g7hjsh.apps.googleusercontent.com";
  const callBackURI = "https://pollrepo.com/";
  window.location.replace(
    `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`
  );
};
