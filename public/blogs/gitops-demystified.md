# GitOps Demystified

The term GitOps is now widely used in the world of Continuous Delivery (CD), but why is it gaining so much attention? Why is it making application management easier than ever before?

## Basics First

### What is Continuous Delivery?

Continuous Delivery is the process of automatically deploying validated application code to your infrastructure. It's all about making deployments faster, safer, and more reliable.

### What is Imperative Coding?

The coding style where you provide instructions step by step to achieve the end goal. It's a procedural way of coding to manipulate the program's state using instructions.

### What is Declarative Coding?

The Code describes the end state of what should be achieved and does not bother to give instructions on how to achieve it.

### So now let's define GitOps.

GitOps is an approach where Infrastructure is defined as Code in a declarative way, with Git as the only source of truth, and the deployment is pull-based. It ensures that an application's cloud infrastructure is entirely reproducible with the state of the operation team's git repository.

Let's Dive Deeper,

### 1) Git as the only source of truth:

The operations team writes code which will be managed in Git repos like GitLab, GitHub, etc., This instantly brings transparency to the process and provides powerful features like pull requests and code reviews. Helps in auditing changes if anything goes wrong. Helps in tracking the last known working state due to versioning thus aiding in easy rollbacks.

### 2) Declarative is the way to go:

The code is written in a declarative way defining the desired state of the infrastructure. The main reasons why it is not imperative are as follows:

a. If code is imperative, the Ops person needs to know the initial state of the system which makes it difficult to track the changes happening to the system at any point in time.  
b. If code is imperative, the entire code changes every single time based on the current state of the application, and to now select which code to execute would involve manual processes.  
c. If code is imperative, with time, the git will hold unused code that will no longer even be remotely close to the current state of the application.

Due to this Infrastructure as Code generally follows a declarative approach.

### 3) Git Changes = Infrastructure Changes:

So now any code change to the repository translates directly to changes in the infrastructure. Which helps automate the deployment process easier with git as the trigger point.

This makes the deployment pipeline:

- Safer  
- Easier to review  
- Reproducible  
- Easy to roll back  

### 4) Push vs Pull deployments:

In a push-based model, the CI/CD pipeline pushes the changes into the environment. The code is built and tested in the pipeline server, the pipeline connects to the target environment and pushes the deployments one by one imperatively.

In pull-based model, the developer pushes a change, the code is built, and images are pushed to the artifactory. An agent running within the cluster, picks up the change and pulls the new state and applies to the cluster constantly reconciling the cluster to match the desired state in Git.

Although a push-based method is easy to set up, it has a lot of drawbacks in the long run, including the pipeline having direct access to the cluster, difficulty in detecting manual cluster changes, rollbacks becoming harder, and the system having no self-heal capabilities.

## The principles of GitOps:

1. **Declarative**  
   A system managed by GitOps must have its desired state expressed declaratively.

2. **Versioned and Immutable**  
   The desired state is stored in a way that enforces immutability, and versioning and retains a complete version history.

3. **Pulled Automatically**  
   Software agents automatically pull the desired state declarations from the source.

4. **Continuously Reconciled**  
   Software agents continuously observe the actual system state and attempt to apply the desired state.

## GITOPS PIPELINE

In a traditional pipeline, the CI/CD arrangement combines code assembling, testing, and delivery within a single workflow.

1. Code is pushed to the Git repository  
2. CI server (Jenkins, GitHub Action) builds the code and runs tests.  
3. After the build passes a CD job(often imperative) deploys the code to the infrastructure.  

**Characteristics:**

- The CI/CD tool and its job definitions control the infrastructure.  
- Imperative scripts manage the deployments  
- The pipeline contains the credentials to directly modify the cluster, which adds a security risk.  
- Tracking the state of the current cluster becomes difficult.  

### In a GitOps Workflow,

1. Code and Infrastructure definitions are pushed to separate (Not a requirement) Git Repositories.  
2. The Continuous Integration pipeline builds the application and pushes it to an artifactory triggering version changes in the infrastructure definitions.  
3. A GitOps agent running within the cluster constantly monitors the infrastructure code repo.  
4. When a change happens, the agent pulls the changes from git and applies them to the cluster.  

**Characteristics:**

- Cluster pulls changes, external systems don't push it.  
- Uses declarative configurations (K8s YAML)  
- Git is the single source of truth  
- Changes are auditable, revertible, and safer.  
- No security concerns.  

## How did we implement GitOps for our semester project?

1. GitHub (for code)  
2. Docker Hub (for images)  
3. GitLab (for manifests)  
4. GitHub Actions (CI/CD)  
5. Argo CD (GitOps delivery on GKE)  

![GitOps Architecture for Quiz App](https://github.com/user-attachments/assets/d86de191-1a4d-47c1-811f-80474ad9eb6d)

## Tool suggestions

**Git Tools** - GitHub, GitLab, Bitbucket, Azure Repos

**Continuous Integration Tools** - GitHub Actions, GitLab CI, CircleCI, Jenkins, Travis CI

**Container Registries** - Docker Hub, GitHub Container Registry, Amazon ECR, Google Container Registry (GCR), Harbor

**GitOps Continuous Deployment Tools** - Argo CD, Flux

---

Author: **Darshan Vijayaraghavan**

---