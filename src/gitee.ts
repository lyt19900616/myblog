import type { OAuth2Config, OAuthUserConfig } from "next-auth/providers";

export interface GiteeProfile {
  avatar_url: string;
  created_at: string;
  email: string;
  id: number;
  name: string;
  login: string;
}
/**
 * [创建第三方应用](https://gitee.com/oauth/applications/new)
 */
export default function Gitee<P extends GiteeProfile>(
  options: OAuthUserConfig<P> = {}
): OAuth2Config<P> {
  const {
    clientId = process.env.AUTH_GITEE_ID!,
    clientSecret = process.env.AUTH_GITEE_SECRET!,
    checks = ["pkce", "state"],
    ...rest
  } = options;
  const BASE_URL = "https://gitee.com";
  return {
    id: "gitee",
    name: "Gitee",
    type: "oauth",
    style: {
      logo: "/providers/gitee.jpg",
      brandColor: "#c71d23",
      text: "#fff",
    },
    checks: checks as ["pkce"],
    clientId,
    clientSecret,
    authorization: {
      url: `${BASE_URL}/oauth/authorize`,
      params: {
        response_type: "code",
        scope: "user_info",
      },
    },
    userinfo: {
      url: `${BASE_URL}/api/v5/user`,
    },
    token: {
      url: `${BASE_URL}/oauth/token`,
      async conform(resp: Response) {
        const { created_at: _, ...json } = await resp.json();
        return Response.json(json);
      },
    },
    profile: (profile) => {
      return {
        id: profile.id + "",
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
    ...rest,
  };
}