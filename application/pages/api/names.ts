//api/names.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const allNames = await prisma.name.findMany();
      res.status(200).json(allNames);
    } catch (error) {
      console.error("Error fetching names:", error);
      if (error instanceof PrismaClientKnownRequestError) {
        res
          .status(500)
          .json({ error: "Internal Server Error", details: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else if (req.method === "POST") {
    try {
      const { name } = req.body;
      const newName = await prisma.name.create({
        data: { name },
      });
      res.status(201).json(newName);
    } catch (error) {
      console.error("Error adding name:", error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002_UniqueConstraintViolation") {
          res.status(400).json({ error: "Name already exists" });
        } else {
          res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
        }
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else if (req.method === "DELETE") {
    if (!req.body || !req.body.id) {
      return res.status(400).json({ error: "Missing ID in request body" });
    }

    const { id } = req.body;

    try {
      await prisma.name.delete({ where: { id } });
      console.log("Name deleted successfully");
      res.status(200).json({ message: "Name deleted successfully" });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error("Prisma known request error:", error);
        res
          .status(500)
          .json({ error: "Internal Server Error", details: error.message });
      } else {
        console.error("Unknown error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
