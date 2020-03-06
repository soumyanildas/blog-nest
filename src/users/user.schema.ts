import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchemaProvider = {

  name: 'User',
  useFactory: () => {
    const UserSchema = new mongoose.Schema({

      name: {
        type: String,
        required: true
      },

      userName: {
        type: String,
        unique: true,
        required: true
      },

      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
      },

      profilePic: { // img url
        type: String,
      },

      password: {
        type: String,
        required: true
      },

      userType: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
      },
    
      isActive: {
        type: Boolean,
        default: false
      },
    
      createdAt: {
        type: Date,
        default: Date.now
      },
    
      lastUpdatedAt: {
        type: Date,
        default: Date.now
      },
    });

    UserSchema.pre('save', function (next: any) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const user = this;
      if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return next(err);
          }
          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
              return next(err);
            }
            user.password = hash;
            next();
          });
        })
      }
    });

    return UserSchema;
  }
}