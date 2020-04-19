package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.FeedbackRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.FeedbackResponseDto;
import com.phoenixoft.teambalanceapp.feedback.entity.Feedback;
import com.phoenixoft.teambalanceapp.feedback.service.FeedbackService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/feedbacks")
@AllArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final UserService userService;

    @PostMapping
    public FeedbackResponseDto save(@Valid @RequestBody FeedbackRequestDto feedbackRequest,
                                    Authentication authentication) {
        CustomUser userDetails = (CustomUser) authentication.getPrincipal();
        User creatorUser = userService.findById(userDetails.getId());
        Feedback newFeedback = feedbackService.save(feedbackRequest, creatorUser);
        return DtoConverter.convertFeedback(newFeedback);
    }
}
