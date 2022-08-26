import type { NextApiRequest, NextApiResponse } from "next";

const handler = (res: NextApiResponse) => {
  res
    .status(200)
    .send({ name: "Hello, Rian Oliveira! Have a nice coding" });
};

export default handler;
