import UserModel from '../model';

export const updateUserFAQ = async (userId: string, faqData: { question: string, answer: string }) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (!Array.isArray(user.faq)) {
    user.faq = [];
  }
  user.faq.push(faqData);
  await user.save();
  return user;
};

export const getUserFAQs = async (userId: string) => {
  const user = await UserModel.findById(userId).select('faq');
  console.log(user, "kkkkkkkkkk");

  if (!user) {
    throw new Error('User not found');
  }
  return user.faq || []
};

export const deleteUserFAQ = async (userId: string, faqId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.faq = user.faq.filter((faq: any) => faq._id.toString() !== faqId);
  await user.save();
  return user;
};
