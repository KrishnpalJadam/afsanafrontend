// import { useEffect } from 'react';

// const TawkMessenger = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://embed.tawk.to/67f385eba29778190aee72a2/1io7k690m";
//     script.async = true;
//     script.charset = "UTF-8";
//     script.setAttribute("crossorigin", "*");
//     document.body.appendChild(script);
//   }, []);

//   return null;
// };

// export default TawkMessenger;

import { useEffect } from 'react';

const TawkMessenger = () => {
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/67f385eba29778190aee72a2/1io7k690m";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);

    // Delay to ensure widget loads
    s1.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.visitor = {
          name: "Rahul Sharma",         // 🔁 Dynamically set from logged-in user
          email: "rahul@example.com"
        };
      }
    };
  }, []);

  return null;
};

export default TawkMessenger;
