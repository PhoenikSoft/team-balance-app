package com.phoenixoft.teambalanceapp.feedback.service;

import com.phoenixoft.teambalanceapp.controller.dto.FeedbackRequestDto;
import com.phoenixoft.teambalanceapp.feedback.entity.Feedback;
import com.phoenixoft.teambalanceapp.feedback.repository.FeedbackRepository;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public Feedback save(FeedbackRequestDto feedbackRequest, User creatorUser) {
        Feedback feedback = new Feedback();
        feedback.setMessage(feedbackRequest.getMessage());
        feedback.setCreatedBy(creatorUser);
        return feedbackRepository.save(feedback);
    }
}
