import {Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import {ProfileService} from './profile.service';
import {Profile} from './entities/profile.entity';
import {CreateProfileInput} from './dto/create-profile.input';
import {UpdateProfileInput} from './dto/update-profile.input';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../authentication/guard/jwt-auth.guard";

@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {
    }

    @Mutation(() => Profile)
    @UseGuards(JwtAuthGuard)

    createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput, @Context() context) {
        try {

            return this.profileService.create(createProfileInput, context.req.user.id);

        } catch (e) {
            return e
        }
    }

    @Query(() => Profile)
    @UseGuards(JwtAuthGuard)
    getProfile(@Context() context) {
        try {
            return this.profileService.findOne(context.req.user.id);

        } catch (e) {
            return e
        }
    }


    @Mutation(() => Profile)
    @UseGuards(JwtAuthGuard)
    updateUserProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput,@Context() context) {
        try {
            return this.profileService.update(context.req.user.id,updateProfileInput);

        } catch (e) {
            return e
        }
    }
}
