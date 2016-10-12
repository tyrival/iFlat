package com.iflat.pam.action;

import com.iflat.pam.entity.MonthlyWorkView;
import com.iflat.base.action.impl.BaseAction;
import com.iflat.base.entity.Page;
import com.iflat.base.service.BaseService;
import com.iflat.pam.bean.*;
import com.iflat.pam.entity.MemberDist;
import com.iflat.pam.entity.NewsSummary;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ModelDriven;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by tyriv on 2016/7/29.
 */
public class PamAction extends BaseAction implements ModelDriven<Page> {
    protected Page page;
    private File upload;
    private String uploadFileName;
    private BaseService newsService;
    private News news;
    private BaseService partyBranchService;
    private PartyBranch partyBranch;
    private BaseService newsSummaryService;
    private NewsSummary newsSummary;
    private BaseService activistService;
    private Activist activist;
    private BaseService applicantService;
    private Applicant applicant;
    private BaseService committeeService;
    private Committee committee;
    private BaseService generalService;
    private General pamGeneral;
    private BaseService memberService;
    private Member pamMember;
    private BaseService monthlyWorkService;
    private MonthlyWork monthlyWork;
    private BaseService partyGroupService;
    private PartyGroup partyGroup;
    private BaseService recorderService;
    private Recorder recorder;
    private BaseService titleService;
    private Title pamTitle;
    private BaseService yearWorkService;
    private YearWork yearWork;
    private BaseService committeeDetailService;
    private CommitteeDetail committeeDetail;
    private BaseService memberDistService;
    private MemberDist memberDist;    /* MemberDist */

    public String listMemberDist() throws Exception {
        this.result.setList(this.memberDistService.list(this.memberDist));
        return SUCCESS;
    }    /* YearWork */

    public String rejectYearWork() throws Exception {
        this.yearWork.setStatus("0");
        this.result.setObject(this.yearWorkService.save(this.yearWork));
        return SUCCESS;
    }

    public String submitYearWork() throws Exception {
        this.yearWork.setStatus("1");
        this.result.setObject(this.yearWorkService.save(this.yearWork));
        return SUCCESS;
    }

    public String saveYearWork() throws Exception {
        this.result.setObject(this.yearWorkService.save(this.yearWork));
        return SUCCESS;
    }

    public String deleteYearWork() throws Exception {
        this.result.setObject(this.yearWorkService.delete(this.yearWork));
        return SUCCESS;
    }

    public String listYearWork() throws Exception {
        this.result.setList(this.yearWorkService.list(this.yearWork));
        return SUCCESS;
    }

    public String listPageYearWork() throws Exception {
        this.result.setObject(this.yearWorkService.listPage(this.yearWork, this.page));
        return SUCCESS;
    }

    public String uploadYearWork() throws Exception {
        this.result.setObject(this.yearWorkService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* Title */

    public String saveTitle() throws Exception {
        this.result.setObject(this.titleService.save(this.pamTitle));
        return SUCCESS;
    }

    public String deleteTitle() throws Exception {
        this.result.setObject(this.titleService.delete(this.pamTitle));
        return SUCCESS;
    }

    public String listTitle() throws Exception {
        this.result.setList(this.titleService.list(this.pamTitle));
        return SUCCESS;
    }

    public String listPageTitle() throws Exception {
        this.result.setObject(this.titleService.listPage(this.pamTitle, this.page));
        return SUCCESS;
    }    /* Recorder */

    public String saveRecorder() throws Exception {
        this.result.setObject(this.recorderService.save(this.recorder));
        return SUCCESS;
    }

    public String deleteRecorder() throws Exception {
        this.result.setObject(this.recorderService.delete(this.recorder));
        return SUCCESS;
    }

    public String listRecorderByUser() throws Exception {
        this.recorder.setAccount(Session.getUserInfo().getAccount());
        this.result.setList(this.recorderService.list(this.recorder));
        return SUCCESS;
    }

    public String listRecorder() throws Exception {
        this.result.setList(this.recorderService.list(this.recorder));
        return SUCCESS;
    }

    public String listPageRecorder() throws Exception {
        this.result.setObject(this.recorderService.listPage(this.recorder, this.page));
        return SUCCESS;
    }    /* PartyGroup */

    public String savePartyGroup() throws Exception {
        this.result.setObject(this.partyGroupService.save(this.partyGroup));
        return SUCCESS;
    }

    public String deletePartyGroup() throws Exception {
        this.result.setObject(this.partyGroupService.delete(this.partyGroup));
        return SUCCESS;
    }

    public String listPartyGroup() throws Exception {
        this.result.setList(this.partyGroupService.list(this.partyGroup));
        return SUCCESS;
    }

    public String listPagePartyGroup() throws Exception {
        this.result.setObject(this.partyGroupService.listPage(this.partyGroup, this.page));
        return SUCCESS;
    }    /* MonthlyWork */

    public String rejectMonthlyWork() throws Exception {
        this.monthlyWork.setStatus("0");
        this.result.setObject(this.monthlyWorkService.save(this.monthlyWork));
        return SUCCESS;
    }

    public String submitMonthlyWork() throws Exception {
        this.monthlyWork.setStatus("1");
        this.result.setObject(this.monthlyWorkService.save(this.monthlyWork));
        return SUCCESS;
    }

    public String saveMonthlyWork() throws Exception {
        this.result.setObject(this.monthlyWorkService.save(this.monthlyWork));
        return SUCCESS;
    }

    public String deleteMonthlyWork() throws Exception {
        this.result.setObject(this.monthlyWorkService.delete(this.monthlyWork));
        return SUCCESS;
    }

    public String listMonthlyWork() throws Exception {
        this.result.setList(this.monthlyWorkService.list(this.monthlyWork));
        return SUCCESS;
    }

    public String listPageMonthlyWork() throws Exception {
        this.result.setObject(this.monthlyWorkService.listPage(this.monthlyWork, this.page));
        return SUCCESS;
    }

    public String uploadMonthlyWork() throws Exception {
        this.result.setObject(this.monthlyWorkService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }    /* Member */

    public String saveMember() throws Exception {
        this.result.setObject(this.memberService.save(this.pamMember));
        return SUCCESS;
    }

    public String deleteMember() throws Exception {
        this.result.setObject(this.memberService.delete(this.pamMember));
        return SUCCESS;
    }

    public String listMember() throws Exception {
        this.result.setList(this.memberService.list(this.pamMember));
        return SUCCESS;
    }

    public String listPageMember() throws Exception {
        this.result.setObject(this.memberService.listPage(this.pamMember, this.page));
        return SUCCESS;
    }    /* General */

    public String loadGeneralByUser() throws Exception {
        List<Recorder> list = new ArrayList<>();
        Recorder recorder = new Recorder();
        recorder.setAccount(Session.getUserInfo().getAccount());
        list = this.recorderService.list(recorder);
        if (list != null && list.size() > 0) {
            this.pamGeneral.setPbName(list.get(0).getPbName());
            this.result.setObject(this.pamGeneral);
            this.result.setList(this.generalService.list(this.pamGeneral));
        }
        return SUCCESS;
    }

    public String saveGeneral() throws Exception {
        this.result.setObject(this.generalService.save(this.pamGeneral));
        return SUCCESS;
    }

    public String deleteGeneral() throws Exception {
        this.result.setObject(this.generalService.delete(this.pamGeneral));
        return SUCCESS;
    }

    public String listGeneral() throws Exception {
        this.result.setList(this.generalService.list(this.pamGeneral));
        return SUCCESS;
    }

    public String listPageGeneral() throws Exception {
        this.result.setObject(this.generalService.listPage(this.pamGeneral, this.page));
        return SUCCESS;
    }    /* Committee */

    public String saveCommittee() throws Exception {
        this.result.setObject(this.committeeService.save(this.committee));
        return SUCCESS;
    }

    public String deleteCommittee() throws Exception {
        CommitteeDetail cd = new CommitteeDetail();
        cd.setPid(this.committee.getId());
        this.committeeDetailService.delete(cd);
        this.result.setObject(this.committeeService.delete(this.committee));
        return SUCCESS;
    }

    public String listCommittee() throws Exception {
        this.result.setList(this.committeeService.list(this.committee));
        return SUCCESS;
    }

    public String listPageCommittee() throws Exception {
        this.result.setObject(this.committeeService.listPage(this.committee, this.page));
        return SUCCESS;
    }    /* CommitteeDetail */

    public String saveCommitteeDetail() throws Exception {
        this.committee = (Committee) this.committeeService.save(this.committee);
        this.committeeDetail.setPid(this.committee.getId());
        this.result.setObject(this.committeeDetailService.save(this.committeeDetail));
        return SUCCESS;
    }

    public String deleteCommitteeDetail() throws Exception {
        this.result.setObject(this.committeeDetailService.delete(this.committeeDetail));
        return SUCCESS;
    }

    public String listCommitteeDetail() throws Exception {
        this.result.setList(this.committeeDetailService.list(this.committeeDetail));
        return SUCCESS;
    }    /* Applicant */

    public String saveApplicant() throws Exception {
        this.result.setObject(this.applicantService.save(this.applicant));
        return SUCCESS;
    }

    public String deleteApplicant() throws Exception {
        this.result.setObject(this.applicantService.delete(this.applicant));
        return SUCCESS;
    }

    public String listApplicant() throws Exception {
        this.result.setList(this.applicantService.list(this.applicant));
        return SUCCESS;
    }

    public String listPageApplicant() throws Exception {
        this.result.setObject(this.applicantService.listPage(this.applicant, this.page));
        return SUCCESS;
    }    /* Activist */

    public String saveActivist() throws Exception {
        this.result.setObject(this.activistService.save(this.activist));
        return SUCCESS;
    }

    public String deleteActivist() throws Exception {
        this.result.setObject(this.activistService.delete(this.activist));
        return SUCCESS;
    }

    public String listActivist() throws Exception {
        this.result.setList(this.activistService.list(this.activist));
        return SUCCESS;
    }

    public String listPageActivist() throws Exception {
        this.result.setObject(this.activistService.listPage(this.activist, this.page));
        return SUCCESS;
    }    /* PartyBranch */

    public String savePartyBranch() throws Exception {
        this.result.setObject(this.partyBranchService.save(this.partyBranch));
        return SUCCESS;
    }

    public String deletePartyBranch() throws Exception {
        this.result.setObject(this.partyBranchService.delete(this.partyBranch));
        return SUCCESS;
    }

    public String listPartyBranch() throws Exception {
        this.result.setList(this.partyBranchService.list(this.partyBranch));
        return SUCCESS;
    }

    public String listPagePartyBranch() throws Exception {
        this.result.setObject(this.partyBranchService.listPage(this.partyBranch, this.page));
        return SUCCESS;
    }    /* News */

    public String saveNews() throws Exception {
        this.result.setObject(this.newsService.save(this.news));
        return SUCCESS;
    }

    public String downBatchNews() throws Exception {
        this.result.setObject(this.newsService.downBatch(this.downloadFileList, this.downloadFileName));
        return SUCCESS;
    }

    public String submitNews() throws Exception {
        this.news.setIsSubmit("1");
        UserInfoVo userInfoVo = Session.getUserInfo();
        this.news.setSubmitAcc(userInfoVo.getAccount());
        this.news.setSubmitName(userInfoVo.getUserName());
        this.news.setSubmitDept(userInfoVo.getPorgName());
        this.news.setSubmitTime(new Date());
        this.news.setStatus("待党群审核");
        this.result.setObject(this.newsService.save(this.news));
        return SUCCESS;
    }

    public String deleteNews() throws Exception {
        this.result.setObject(this.newsService.delete(this.news));
        return SUCCESS;
    }

    public String listNews() throws Exception {
        this.result.setList(this.newsService.list(this.news));
        return SUCCESS;
    }

    public String uploadNews() throws Exception {
        this.result.setObject(this.newsService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

    public String listPageNews() throws Exception {
        this.result.setObject(this.newsService.listPage(this.news, this.page));
        return SUCCESS;
    }

    public String approveNewsPam() throws Exception {
        News orig = new News();
        orig.setId(this.news.getId());
        orig = (News) this.newsService.list(orig).get(0);
        UserInfoVo user = Session.getUserInfo();
        orig.setApprvAcc(user.getAccount());
        orig.setApprvName(user.getUserName());
        orig.setApprvTime(new Date());
        orig.setIsAdopt(this.news.getIsAdopt());
        orig.setSecApprv(this.news.getSecApprv());
        orig.setStatus(this.news.getStatus());
        if ("1".equals(this.news.getIsAdopt())) {
            orig.setAmount(5);
        }
        this.result.setObject(this.newsService.save(orig));
        return SUCCESS;
    }

    public String approveNewsSec() throws Exception {
        News orig = new News();
        orig.setId(this.news.getId());
        orig = (News) this.newsService.list(orig).get(0);
        UserInfoVo user = Session.getUserInfo();
        orig.setSecApprvAcc(user.getAccount());
        orig.setSecApprvName(user.getUserName());
        orig.setSecApprvTime(new Date());
        orig.setStatus(this.news.getStatus());
        this.result.setObject(this.newsService.save(orig));
        return SUCCESS;
    }

    public String rejectNews() throws Exception {
        News orig = new News();
        orig.setId(this.news.getId());
        orig = (News) this.newsService.list(orig).get(0);
        if ("待党群审核".equals(orig.getStatus())) {
            orig.setIsSubmit("");
            orig.setSubmitAcc("");
            orig.setSubmitName("");
            orig.setStatus("未提交");
        } else {
            orig.setIsAdopt("");
            orig.setSecApprv("");
            orig.setApprvAcc("");
            orig.setApprvName("");
            orig.setStatus("待党群审核");
        }
        this.result.setObject(this.newsService.save(orig));
        return SUCCESS;
    }    /* NewsSummary */

    public String listNewsSummary() throws Exception {
        this.result.setList(this.newsSummaryService.list(this.newsSummary));
        return SUCCESS;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    public BaseService getNewsService() {
        return newsService;
    }

    public void setNewsService(BaseService newsService) {
        this.newsService = newsService;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public BaseService getNewsSummaryService() {
        return newsSummaryService;
    }

    public void setNewsSummaryService(BaseService newsSummaryService) {
        this.newsSummaryService = newsSummaryService;
    }

    public NewsSummary getNewsSummary() {
        return newsSummary;
    }

    public void setNewsSummary(NewsSummary newsSummary) {
        this.newsSummary = newsSummary;
    }

    public BaseService getPartyBranchService() {
        return partyBranchService;
    }

    public void setPartyBranchService(BaseService partyBranchService) {
        this.partyBranchService = partyBranchService;
    }

    public PartyBranch getPartyBranch() {
        return partyBranch;
    }

    public void setPartyBranch(PartyBranch partyBranch) {
        this.partyBranch = partyBranch;
    }

    public BaseService getActivistService() {
        return activistService;
    }

    public void setActivistService(BaseService activistService) {
        this.activistService = activistService;
    }

    public Activist getActivist() {
        return activist;
    }

    public void setActivist(Activist activist) {
        this.activist = activist;
    }

    public BaseService getApplicantService() {
        return applicantService;
    }

    public void setApplicantService(BaseService applicantService) {
        this.applicantService = applicantService;
    }

    public Applicant getApplicant() {
        return applicant;
    }

    public void setApplicant(Applicant applicant) {
        this.applicant = applicant;
    }

    public BaseService getCommitteeService() {
        return committeeService;
    }

    public void setCommitteeService(BaseService committeeService) {
        this.committeeService = committeeService;
    }

    public Committee getCommittee() {
        return committee;
    }

    public void setCommittee(Committee committee) {
        this.committee = committee;
    }

    public BaseService getGeneralService() {
        return generalService;
    }

    public void setGeneralService(BaseService generalService) {
        this.generalService = generalService;
    }

    public General getPamGeneral() {
        return pamGeneral;
    }

    public void setPamGeneral(General pamGeneral) {
        this.pamGeneral = pamGeneral;
    }

    public BaseService getMemberService() {
        return memberService;
    }

    public void setMemberService(BaseService memberService) {
        this.memberService = memberService;
    }

    public Member getPamMember() {
        return pamMember;
    }

    public void setPamMember(Member pamMember) {
        this.pamMember = pamMember;
    }

    public BaseService getMonthlyWorkService() {
        return monthlyWorkService;
    }

    public void setMonthlyWorkService(BaseService monthlyWorkService) {
        this.monthlyWorkService = monthlyWorkService;
    }

    public MonthlyWork getMonthlyWork() {
        return monthlyWork;
    }

    public void setMonthlyWork(MonthlyWork monthlyWork) {
        this.monthlyWork = monthlyWork;
    }

    public BaseService getPartyGroupService() {
        return partyGroupService;
    }

    public void setPartyGroupService(BaseService partyGroupService) {
        this.partyGroupService = partyGroupService;
    }

    public PartyGroup getPartyGroup() {
        return partyGroup;
    }

    public void setPartyGroup(PartyGroup partyGroup) {
        this.partyGroup = partyGroup;
    }

    public BaseService getRecorderService() {
        return recorderService;
    }

    public void setRecorderService(BaseService recorderService) {
        this.recorderService = recorderService;
    }

    public Recorder getRecorder() {
        return recorder;
    }

    public void setRecorder(Recorder recorder) {
        this.recorder = recorder;
    }

    public BaseService getTitleService() {
        return titleService;
    }

    public void setTitleService(BaseService titleService) {
        this.titleService = titleService;
    }

    public Title getPamTitle() {
        return pamTitle;
    }

    public void setPamTitle(Title pamTitle) {
        this.pamTitle = pamTitle;
    }

    public BaseService getYearWorkService() {
        return yearWorkService;
    }

    public void setYearWorkService(BaseService yearWorkService) {
        this.yearWorkService = yearWorkService;
    }

    public YearWork getYearWork() {
        return yearWork;
    }

    public void setYearWork(YearWork yearWork) {
        this.yearWork = yearWork;
    }

    public BaseService getCommitteeDetailService() {
        return committeeDetailService;
    }

    public void setCommitteeDetailService(BaseService committeeDetailService) {
        this.committeeDetailService = committeeDetailService;
    }

    public CommitteeDetail getCommitteeDetail() {
        return committeeDetail;
    }

    public void setCommitteeDetail(CommitteeDetail committeeDetail) {
        this.committeeDetail = committeeDetail;
    }

    public BaseService getMemberDistService() {
        return memberDistService;
    }

    public void setMemberDistService(BaseService memberDistService) {
        this.memberDistService = memberDistService;
    }

    public MemberDist getMemberDist() {
        return memberDist;
    }

    public void setMemberDist(MemberDist memberDist) {
        this.memberDist = memberDist;
    }

    @Override
    public Page getModel() {
        if (page == null) {
            page = new Page();
        }
        return page;
    }

    private BaseService monthlyWorkViewService;
    private MonthlyWorkView monthlyWorkView;

    public BaseService getMonthlyWorkViewService() {
        return monthlyWorkViewService; }

    public void setMonthlyWorkViewService(BaseService monthlyWorkViewService) {
        this.monthlyWorkViewService = monthlyWorkViewService;
    }

    public MonthlyWorkView getMonthlyWorkView() {
        return monthlyWorkView;
    }

    public void setMonthlyWorkView(MonthlyWorkView monthlyWorkView) {
        this.monthlyWorkView = monthlyWorkView; }

    public String saveMonthlyWorkView() throws Exception {
        this.result.setObject(this.monthlyWorkViewService.save(this.monthlyWorkView));
        return SUCCESS;
    }

    public String deleteMonthlyWorkView() throws Exception {
        this.result.setObject(this.monthlyWorkViewService.delete(this.monthlyWorkView));
        return SUCCESS;
    }

    public String listMonthlyWorkView() throws Exception {
        this.result.setList(this.monthlyWorkViewService.list(this.monthlyWorkView));
        return SUCCESS;
    }

    public String listPageMonthlyWorkView() throws Exception {
        this.result.setObject(this.monthlyWorkViewService.listPage(this.monthlyWorkView, this.page));
        return SUCCESS;
    }

    public String uploadMonthlyWorkView() throws Exception {
        this.result.setObject(this.monthlyWorkViewService.uploadFile(upload, uploadFileName));
        return SUCCESS;
    }

}