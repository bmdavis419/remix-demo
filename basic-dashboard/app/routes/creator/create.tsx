import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const title = formData.get("title");
  const cik = formData.get("cik");

  invariant(name, "name is required");
  invariant(title, "title is required");
  invariant(cik, "cik is required");

  // IMAGINE THIS IS GETTING SAVED INTO THE DB

  const params = new URLSearchParams();
  params.set("name", name as string);
  params.set("title", title as string);
  params.set("cik", cik as string);

  // IN REALITY, WE WOULD WANT TO REDIRECT TO THE NEWLY CREATED CREATOR
  return redirect("/creator/view?" + params.toString());
};

const Creator: React.FC = () => {
  const transition = useTransition();

  return (
    <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
      <h1 className="text-white text-5xl font-bold mb-6">Create New Insider</h1>
      <Form method="post" action="/creator/create">
        <fieldset disabled={transition.state === "submitting"}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block font-light text-white text-sm italic"
            >
              name
            </label>
            <input
              type="text"
              name="name"
              className="px-2 py-2 rounded-md w-[300px]"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block font-light text-white text-sm italic"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              className="px-2 py-2 rounded-md w-[300px]"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="cik"
              className="block font-light text-white text-sm italic"
            >
              cik
            </label>
            <input
              type="text"
              name="cik"
              className="px-2 py-2 rounded-md w-[300px]"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
          >
            create
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export default Creator;
