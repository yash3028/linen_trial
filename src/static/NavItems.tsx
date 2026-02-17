export interface SubModule {
  url: string;
  name: string;
}

export interface Module {
  url: string;
  name: string;
  imageUrl?: string;
  sub_modules?: SubModule[];
}

export interface NavItem {
  url: string;
  name: string;
  modules: Module[];
}
export const NavItems: NavItem[] = [
  // {
  //   url: "",
  //   name: "SHOP FOR HIM",
  //   modules: [
  //     {
  //       url: "",
  //       name: "LINEN SHIRTS",
  //       imageUrl: "",
  //       sub_modules: [
  //         { url: " ", name: "Short Sleeves" },
  //         { url: " ", name: "Long Sleeves" },
  //       ],
  //     },
  //     {
  //       url: "",
  //       name: "LINEN TROUSERS",
  //       imageUrl: "",
  //       sub_modules: [
  //         {
  //           url: "",
  //           name: "Pants",
  //         },
  //         { url: "", name: "Joggers" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   url: "",
  //   name: "SHOP FOR HER",
  //   modules: [
  //     { url: "", name: "Linen Co-Ord" },
  //     { url: "", name: "Linen Tops" },
  //   ],
  // },
];
