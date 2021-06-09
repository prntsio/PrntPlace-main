const HttpError = require('../models/http-error');
const ApprovalRequest = require('../models/approvalRequest');

const createRequest = async (req, res, next) => {
    const { id, links, description } = req.body;
    const createdRequest = new ApprovalRequest({
        id,
        links,
        description,
    });
    let request;
    try {
        request = await createdRequest.save();
    } catch (error) {
        return res
            .status(404)
            .json({ message: 'Unable to send the approval request!' });
    }

    res.status(201).json(request);
};

const getIsApproved = async (req, res, next) => {
    const userId = req.params.uid;
    let isApproved;
    try {
        const approvalRequests = await ApprovalRequest.find().exec();
        const approvalRequest = approvalRequests.find(
            (approvalRequest) => approvalRequest.id === userId
        );
        if (!approvalRequest) {
            isApproved = false;
        } else {
            isApproved = approvalRequest.isApproved;
        }
    } catch (err) {
        return res
            .status(404)
            .json({ message: 'Unable to fetch approval request data.' });
    }

    res.json(isApproved);
};

exports.createRequest = createRequest;
exports.getIsApproved = getIsApproved;
