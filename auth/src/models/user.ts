import mongoose from 'mongoose';
import { Password } from '../services/password';
// An interface that describes the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties of a user Model to be able to use User.build
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes that user Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// telling mongoose about user properties
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
// Pre-save hook
// no arrow fct to keep the context of this
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
