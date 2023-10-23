# HDCShare Project Demo

### Summary

This is a demo of a file-transfer software I built for Home Detective Co. in Colfax, North Carolina. This demo was built in one month with a strict deadline to be ready for a company-wide employee training. The project was shown off on 10/20/2023 and received great feedback! The main pillars the project needed to exhibit were useability and security.

### UI Overview

#### Inbox Page

![inbox page](https://github.com/isaacdenny/HDCShare-Demo/blob/main/ui-pics/inbox_page.png?raw=true)

To keep employees feeling at home on the new app, the inbox page features a familiar look similar to Gmail. Most obvious on the page is a table of all the transfers the lot has receieved; the table shows simple transfer information like the subject line, sender, number of files, and more. You can get more info on the transfer upon clicking the respective view button.

#### Compose Page

![inbox page](https://github.com/isaacdenny/HDCShare-Demo/blob/main/ui-pics/compose_page.png?raw=true)

The compose page is a simple form to let users upload files and send a transfer with a subject and optional message. They can also select multiple recipients if desired. Below is an example of a filled out transfer form:

![inbox page](https://github.com/isaacdenny/HDCShare-Demo/blob/main/ui-pics/compose_page_alt.png?raw=true)

#### Transfer-View Page

![inbox page](https://github.com/isaacdenny/HDCShare-Demo/blob/main/ui-pics/transfer_view_page.png?raw=true)

The transfer-view page is dynamically routed based on the transfer ID to allow for any number of transfers during the life of the app. The page shows simple transfer information like the subject line, message, transferID, sender, and relevant data on the files attached.


### Post-Demo feedback

The employee training went great! Listeners felt the UI was very simple and easy to understand. There were great questions focused on new features to add to the final build and steps we can take to avoid potential security risks involved with client information sharing. 

#### Overview of Discussed Features To Come
1. Starring or saving transfers
2. "New" transfers highlighted in inbox
3. Filtering / search
4. Notifications / alerts for important company announcements or news
5. "Viewed" or "Printed" qualifications on transfers to show sender
6. Support tickets and helpful documentation on the app
7. Easy mass-downloading for large-quantity printing
8. Scheduled deletion of transfers after viewed or printed

#### Features to Drop
1. File zipping / extraction
2. Multiple senders/receivers (headquarters can send to everyone, satelite lots can only send to headquarters)
3. Upload fileviewer

While many of these features increase functionality, it was important to keep complexity to a minimum; certain features have been dropped for this purpose (i.e. file zipping)

Thanks for viewing!

