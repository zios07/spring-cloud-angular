package ma.fgs.product.rest.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import ma.fgs.product.proxy.AttachmentProxy;

@FeignClient(name = "attachment-service", path = "api/attachments")
public interface AttachmentFeignClient {

	@RequestMapping(value = "/by-entity", method = RequestMethod.GET)
	List<AttachmentProxy> getAttachmentsByEntity(@RequestParam String className, @RequestParam Object entityId);

}
