import { createModel, def } from "cheetah";
import { CommentModel, UserModel } from "./collections";

export const Comment = createModel({
  modelName: CommentModel,
  schema: {
    body: def.string.required.text,
    author: def.ref(UserModel).required,
    replies: [def.ref(CommentModel)],
    likes: def.number.default(0),
  },
});
