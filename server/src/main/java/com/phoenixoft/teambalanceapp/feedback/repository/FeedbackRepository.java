package com.phoenixoft.teambalanceapp.feedback.repository;

import com.phoenixoft.teambalanceapp.feedback.entity.Feedback;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends CrudRepository<Feedback, Long> {
}
