package ma.fgs.product.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import ma.fgs.product.proxy.AttachmentProxy;

@Entity
public class Product {

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String code;

	private String label;

	private String description;

	private Double price;

	private int qteStock;

	private String uuid;

	@Transient
	private List<AttachmentProxy> attachments;

	@ManyToOne
	private Brand brand;

	@ManyToOne
	private Category category;

	@ManyToOne
	private User owner;

	private Date addedDate;

	public Product() {
	}

	public Product(String code, String label, String description, Double price, int qteStock, String uuid,
			List<AttachmentProxy> attachments, Brand brand, Category category, User owner, Date addedDate) {
		super();
		this.code = code;
		this.label = label;
		this.description = description;
		this.price = price;
		this.qteStock = qteStock;
		this.uuid = uuid;
		this.attachments = attachments;
		this.brand = brand;
		this.category = category;
		this.owner = owner;
		this.addedDate = addedDate;
	}

	public List<AttachmentProxy> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<AttachmentProxy> attachments) {
		this.attachments = attachments;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getPrice() {
		return price;
	}

	public int getQteStock() {
		return qteStock;
	}

	public void setQteStock(int qteStock) {
		this.qteStock = qteStock;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

}
