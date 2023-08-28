const {BookingService} = require('../services/index');

const bookingService = new BookingService() ;

const {StatusCodes} = require('http-status-codes');
const create = async (req,res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message : 'successfully completed booking',
            success : true,
            data : response,
            err : {}
        })
        
    } catch (error) {
        console.log('From Booking controlers',error);
        return res.status(error.statusCode).json({
           message : error.message,
           success : false,
           err : error.explanation,
           data : {} 
        });
        
    }
     
}
module.exports = {
    create
}