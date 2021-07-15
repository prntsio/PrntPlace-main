const HttpError = require('../models/http-error');
const ApprovalRequest = require('../models/approvalRequest');

const getRequestDataByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let request;
    try {
        const requests = await ApprovalRequest.find().exec();
        request = requests.find((request) => request.id === userId);
    } catch (err) {
        return res
            .status(404)
            .json({ message: 'Unable to fetch approval request data.' });
    }
    let isRequestSent = true;
    if (!request) {
        isRequestSent = false;
        const error = new HttpError(
            'Could not find the approval request with the provider user id.',
            404
        );
        return next(error);
    }

    res.json({ request, isRequestSent });
};

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

const updateRequest = async (req, res, next) => {
    const { links, description } = req.body;
    const userId = req.params.uid;

    let request;
    try {
        const requests = await ApprovalRequest.find().exec();
        request = await requests.find((request) => request.id === userId);
    } catch (error) {
        return next(
            new HttpError(
                'Something went wrong, could not update approval request data.',
                500
            )
        );
    }

    request.links = links;
    request.description = description;

    try {
        await request.save();
    } catch (err) {
        return next(
            new HttpError(
                'Something went wrong, could not update approval request data.',
                500
            )
        );
    }

    // normal not 201 bcz we didnt created anything new
    res.status(200).json(request);
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
exports.updateRequest = updateRequest;
exports.getIsApproved = getIsApproved;
exports.getRequestDataByUserId = getRequestDataByUserId;
