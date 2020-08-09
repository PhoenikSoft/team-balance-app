package com.phoenixoft.teambalanceapp.vote.repository.spec;

import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVotesFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@RequiredArgsConstructor
public class UserVoteVoterFieldSpecification implements Specification<UserVote> {

    private final UserVotesFilter filter;

    @Override
    public Predicate toPredicate(Root<UserVote> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (filter.getVoterId() != null) {
            return criteriaBuilder.equal(root.get("voter"), filter.getVoterId());
        }
        return null;
    }
}
