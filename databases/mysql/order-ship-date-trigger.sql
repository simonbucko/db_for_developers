DELIMITER //
CREATE TRIGGER after_ship_date_change_from_null_set_status_shipped
AFTER UPDATE ON eshop.order
FOR EACH ROW
BEGIN
	DECLARE order_id INT;
    IF NEW.shippedDate IS NOT NULL AND OLD.shippedDate IS NULL THEN
        SET order_id = NEW.id; 
        
        UPDATE eshop.order
        SET orderStatusId = 1
        WHERE id = order_id;
    END IF;
END;
//