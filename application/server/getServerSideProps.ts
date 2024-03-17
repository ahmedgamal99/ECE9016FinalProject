import { Name, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps(): Promise<{
  props: { names: Name[] };
}> {
  const allNames = await prisma.name.findMany();

  return {
    props: {
      names: allNames, // Pass fetched names as props
    },
  };
}
