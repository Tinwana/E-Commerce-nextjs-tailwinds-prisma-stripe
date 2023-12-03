import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismaDb";
class currentUser {
  public getServerSession;
  public authOptions;
  constructor() {
    this.getServerSession = getServerSession;
    this.authOptions = authOptions;
  }
  async getSession() {
    return await this.getServerSession(this.authOptions);
  }
  async getCurrentUser() {
    try {
      const session = await this.getSession();
      if (!session?.user?.email) {
        return null;
      }
      const currentUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!currentUser) return null;
      return {
        ...currentUser,
        createAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified
          ? currentUser.emailVerified?.toString()
          : null,
      };
    } catch (error) {
      return null;
    }
  }
}
export default new currentUser();
