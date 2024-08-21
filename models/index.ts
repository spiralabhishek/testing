import mongoose from 'mongoose';
import BoardModel from '@/app/api/boards/model';
import CategoryModel from '@/app/api/categories/model';
import InquiryModel from '@/app/api/inquiries/model';
import OptionModel from '@/app/api/options/model';
import PostModel from '@/app/api/posts/model';
import ReviewModel from '@/app/api/reviews/model';
import StatisticModel from '@/app/api/statistics/model';
import TeamMemberModel from '@/app/api/teammembers/model';
import UserModel from '@/app/api/users/model';

const models = {
    UserModel: mongoose.models.Users || UserModel,
    PostModel: mongoose.models.Posts || PostModel,
    InquiryModel: mongoose.models.Inquiries || InquiryModel,
    CategoryModel: mongoose.models.Categories || CategoryModel,
    ReviewModel: mongoose.models.Reviews || ReviewModel,
    StatisticModel: mongoose.models.Statistics || StatisticModel,
    TeamMemberModel: mongoose.models.TeamMembers || TeamMemberModel,
    OptionModel: mongoose.models.Options || OptionModel,
    BoardModel: mongoose.models.Boards || BoardModel,
};

export default models;
