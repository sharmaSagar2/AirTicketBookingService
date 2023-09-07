const {BookingService} = require('../services/index');

const bookingService = new BookingService() ;

const {StatusCodes} = require('http-status-codes');

const {createChannel, publishMessage} = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
class BookingController {
    constructor() {
    
    }

    async sendMessageToQueue(req,res) {
        const channel = await createChannel();
        const data = {message:'success'};
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:'successfully published message'
        });
    }


    async create (req,res) {
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
}
 
module.exports = BookingController;