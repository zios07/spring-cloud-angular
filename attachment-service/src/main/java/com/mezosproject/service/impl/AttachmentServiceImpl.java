package com.mezosproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.mezosproject.exception.NotFoundException;
import com.mezosproject.model.Attachment;
import com.mezosproject.repository.AttachmentRepository;
import com.mezosproject.service.AttachmentService;
import com.mezosproject.util.Constants;

@Service
public class AttachmentServiceImpl implements AttachmentService {

	private AttachmentRepository attachmentRepository;

	public AttachmentServiceImpl(AttachmentRepository attachmentRepository) {
		this.attachmentRepository = attachmentRepository;
	}

	@Override
	public Attachment create(Attachment attachment) {
		return attachmentRepository.save(attachment);
	}

	@Override
	public Attachment update(Attachment attachment) {
		return attachmentRepository.save(attachment);
	}

	@Override
	public Attachment findByID(String ID) throws NotFoundException {
		Optional<Attachment> optionalAttachment = attachmentRepository.findById(ID);
		if (optionalAttachment.isPresent()) {
			return optionalAttachment.get();
		}
		throw new NotFoundException(Constants.ATTACHMENT_NOT_FOUND_CODE, Constants.ATTACHMENT_NOT_FOUND_MESSAGE);
	}

	@Override
	public List<Attachment> getAttachments() {
		return attachmentRepository.findAll();
	}

	@Override
	public Page<Attachment> getAttachments(int page, int size) {
		return attachmentRepository.findAll(PageRequest.of(page, size));
	}

	@Override
	public List<Attachment> getEntityAttachment(String className, Object id) {
		return attachmentRepository.findByClassNameAndEntityId(className, id);
	}

	@Override
	public List<Attachment> getEntityAttachment(String className, Object id, int page, int size) {
		return attachmentRepository.findByClassNameAndEntityId(className, id, PageRequest.of(page, size));
	}

	@Override
	public List<Attachment> save(List<Attachment> attachments) {
		return attachmentRepository.saveAll(attachments);
	}

}
