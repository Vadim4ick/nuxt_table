import type { IHeaderTable } from "../types";

export const headerTable: IHeaderTable[] = [
  {
    name: "id",

    style: {
      width: "5%",
    },

    sortable: true,
  },
  {
    name: "title",

    style: {
      width: "30%",
    },
  },
  {
    name: "body",

    style: {
      width: "65%",
    },
  },
];
