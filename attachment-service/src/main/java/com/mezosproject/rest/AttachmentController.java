package com.mezosproject.rest;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mezosproject.model.Attachment;
import com.mezosproject.service.AttachmentService;

@RestController
@RequestMapping(value = "api/attachments")
public class AttachmentController {
	
	private AttachmentService attachmentService;
	
	public AttachmentController(AttachmentService attachmentService) {
		this.attachmentService = attachmentService;
	}
	
	@GetMapping(value = "by-entity")
	public List<Attachment> getAttachmentsByEntity(@RequestParam String className, @RequestParam Object entityId) {
		return attachmentService.getEntityAttachment(className, entityId);
	}
	
	@PostMapping(value = "by-metadata")
	public List<Attachment> getAttachmentsByMetadata(@RequestBody Map<String, Object> metadata) {
		return attachmentService.getAttachmentsByMetadata(metadata);
	}

}
