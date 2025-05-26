// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";

// const Premium = () => {
//   const [isUserPremium, setIsUserPremium] = useState(false);
//   useEffect(() => {
//     verifyPremiumUser();
//   }, []);

//   const verifyPremiumUser = async () => {
//     const res = await axios.get(BASE_URL + "/premium/verify", {
//       withCredentials: true,
//     });

//     if (res.data.isPremium) {
//       setIsUserPremium(true);
//     }
//   };

//   const handleBuyClick = async (type) => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       {
//         membershipType: type,
//       },
//       { withCredentials: true }
//     );

//     const { amount, keyId, currency, notes, orderId } = order.data;

//     const options = {
//       key: keyId,
//       amount,
//       currency,
//       name: "Dev Tinder",
//       description: "Connect to other developers",
//       order_id: orderId,
//       prefill: {
//         name: notes.firstName + " " + notes.lastName,
//         email: notes.emailId,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//       handler: verifyPremiumUser,
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   return isUserPremium ? (
//     "You're are already a premium user"
//   ) : (
//     <div className="m-10">
//       <div className="flex w-full">
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1 className="font-bold text-3xl">Silver Membership</h1>
//           <ul>
//             <li> - Chat with other people</li>
//             <li> - 100 connection Requests per day</li>
//             <li> - Blue Tick</li>
//             <li> - 3 months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("gold")}
//             className="btn btn-secondary"
//           >
//             Buy Silver
//           </button>
//         </div>
//         <div className="divider divider-horizontal">OR</div>
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1 className="font-bold text-3xl">Gold Membership</h1>
//           <ul>
//             <li> - Chat with other people</li>
//             <li> - Inifiniye connection Requests per day</li>
//             <li> - Blue Tick</li>
//             <li> - 6 months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("gold")}
//             className="btn btn-primary"
//           >
//             Buy Gold
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Premium;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { FaCrown, FaGem } from "react-icons/fa";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── verify premium once ─
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/premium/verify`, {
          withCredentials: true,
        });
        setIsPremium(Boolean(data.isPremium));
      } catch (err) {
        console.error("Premium verification failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── buy handler ─
  const handleBuy = async (type) => {
    try {
      // Step 1: Dynamically load Razorpay SDK
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      const scriptLoaded = new Promise((resolve, reject) => {
        script.onload = () => resolve(true);
        script.onerror = () => reject("Razorpay SDK failed to load");
      });

      document.body.appendChild(script);
      await scriptLoaded;

      // Step 2: Get order info from backend
      const { data } = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = data;

      // Step 3: Create Razorpay instance
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "DevTinder",
        description: `${type} membership`,
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: { color: "#8465ff" },
        handler: () => window.location.reload(), // refresh to re-verify
      });

      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  // ── loading state ─
  if (loading)
    return (
      <p className="mt-20 text-center text-lg text-base-content/70">
        Checking your membership…
      </p>
    );

  // ── premium check ─
  if (isPremium)
    return (
      <h1 className="mt-20 text-center text-3xl font-bold text-primary">
        🎉 You’re already a Premium member!
      </h1>
    );

  // ── pricing cards ─
  const plans = [
    {
      tier: "Silver",
      color: "secondary",
      icon: <FaCrown />,
      perks: [
        "Chat with anyone",
        "100 connection requests /day",
        "Blue verification tick",
        "3-month duration",
      ],
    },
    {
      tier: "Gold",
      color: "primary",
      icon: <FaGem />,
      perks: [
        "Chat with anyone",
        "Unlimited connection requests",
        "Blue verification tick",
        "6-month duration",
      ],
    },
  ];

  return (
    <section className="mx-auto mt-14 flex max-w-5xl flex-col items-center gap-10 px-4 sm:flex-row">
      {plans.map(({ tier, color, icon, perks }) => (
        <div
          key={tier}
          className="group relative w-full rounded-3xl bg-base-200/60 backdrop-blur-md p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
        >
          {/* glow ring */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

          <div className="flex flex-col items-center text-center space-y-4">
            {/* tier icon & title */}
            <div
              className={`btn btn-${color} btn-circle text-2xl pointer-events-none`}
            >
              {icon}
            </div>
            <h2 className="text-3xl font-extrabold">{tier} Membership</h2>

            {/* perks list */}
            <ul className="space-y-1 text-base-content/80">
              {perks.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>

            {/* buy button */}
            <button
              onClick={() => handleBuy(tier.toLowerCase())}
              className={`btn btn-${color} mt-4 w-full hover:scale-[1.03] transition-transform`}
            >
              Buy {tier}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Premium;
