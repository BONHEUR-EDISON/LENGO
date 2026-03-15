/* eslint-disable react/no-children-prop */
// app/page.tsx

import ServerAccueil  from "./accueil/ServerAccueil";

export default function Home() {
  
  return <ServerAccueil children={"AcceuilClient"} />;
}
