import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

function getCurrentISTPeriod() {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const yyyy = ist.getFullYear();
  const mm = String(ist.getMonth() + 1).padStart(2, "0");
  const dd = String(ist.getDate()).padStart(2, "0");
  const hh = String(ist.getHours()).padStart(2, "0");
  const mi = String(ist.getMinutes()).padStart(2, "0");
  return `${yyyy}${mm}${dd}${hh}${mi}`;
}

export const autoDraw = functions.pubsub
  .schedule("every 1 minutes")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    const period = getCurrentISTPeriod();
    const resultRef = db.collection("dice_results").doc(period);

    const resultSnap = await resultRef.get();
    if (resultSnap.exists) return;

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const d3 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2 + d3;

    await resultRef.set({ dice: [d1, d2, d3], total });

    const betsSnap = await db
      .collection("bets")
      .where("period", "==", period)
      .where("status", "==", "pending")
      .get();

    for (const doc of betsSnap.docs) {
      const bet = doc.data();
      let win = false;
      const amount = bet.amount;
      if (bet.type === "big") win = total >= 11;
      else if (bet.type === "small") win = total <= 10;
      else if (bet.type === "odd") win = total % 2 === 1;
      else if (bet.type === "even") win = total % 2 === 0;
      else if (bet.type.startsWith("sum_"))
        win = parseInt(bet.type.split("_")[1]) === total;

      if (win) {
        const payout = bet.type.startsWith("sum_")
          ? amount * 5.8
          : amount * 1.95;
        const userRef = db.collection("users").doc(bet.uid);
        await userRef.update({
          balance: admin.firestore.FieldValue.increment(payout),
        });
      }

      await doc.ref.update({ status: "settled" });
    }
  });
