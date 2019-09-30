package com.mezosproject.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mezosproject.model.Attachment;

@Repository
public interface AttachmentRepository extends MongoRepository<Attachment, String> {

	List<Attachment> findByClassNameAndEntityId(String className, Object id);

	List<Attachment> findByClassNameAndEntityId(String className, Object id, PageRequest pageRequest);

}
