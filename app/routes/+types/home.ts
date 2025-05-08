import type { MetaArgs as RRMetaArgs } from "react-router";

export namespace Route {
  export type MetaArgs = RRMetaArgs<typeof loader>;
  export type LoaderArgs = {
    context: {
      VALUE_FROM_NETLIFY?: string;
    };
  };
  export type LoaderData = ReturnType<typeof loader>;
  export type ComponentProps = {
    loaderData: LoaderData;
  };
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY };
} 