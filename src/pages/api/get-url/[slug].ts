import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const nextApiHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { slug } = req.query;

  if (!slug) {
    res.status(400).json({ error: "No slug provided" });
    return;
  }

  const shortLink = await prisma.shortLink.findUnique({
    where: {
      slug: slug as string,
    },
  });

  if (!shortLink) {
    return res.status(404).json({
      error: "Short link not found",
    });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Cache-Control",
    "s-maxage=10000000000, stale-while-revalidate"
  );

  return res.json(shortLink);
};

export default nextApiHandler;
