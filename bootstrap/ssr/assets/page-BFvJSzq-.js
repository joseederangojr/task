import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function SpacePage(props) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-screen min-h-screen", children: [
    /* @__PURE__ */ jsx("h1", { className: "mt-10 mb-5 text-3xl font-bold", children: "Select Space" }),
    /* @__PURE__ */ jsx("div", { className: "w-full min-h-[25vh]", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap max-w-md items-center space-x-4 mx-auto", children: props.spaces.map((space) => /* @__PURE__ */ jsx(
      "li",
      {
        className: "text-center border border-dashed hover:border-solid rounded px-4 py-2",
        children: /* @__PURE__ */ jsx(
          Link,
          {
            "data-dusk": `space-${space.id}`,
            href: `/space/${space.id}`,
            children: space.name
          }
        )
      },
      `space-${space.id}`
    )) }) })
  ] });
}
export {
  SpacePage as default
};
